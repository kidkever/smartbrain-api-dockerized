export const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db("users")
    .select("*")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("Not Found!");
      }
    })
    .catch((err) => res.status(400).json("Error Founding User!"));
};

export const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  db("users")
    .where({ id })
    .update({ name })
    .then((resp) => {
      if (resp) {
        res.json("success");
      } else {
        res.status(400).json("Unable to update");
      }
    })
    .catch((err) => res.status(400).json("error updating user!"));
};
