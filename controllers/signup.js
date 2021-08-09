const handleSignup = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const saltRounds = 10;
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      db.transaction((trx) => {
        trx
          .insert({
            hash: hash,
            email: email,
          })
          .into("login")
          .returning("email")
          .then((loginEmail) => {
            return trx("users")
              .returning("*")
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date(),
              })
              .then((user) => {
                res.json(user[0]);
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      }).catch((err) => console.log(err));
    })
    .catch((err) => res.status(400).json("unable to sign up!", err));
};

export default handleSignup;
