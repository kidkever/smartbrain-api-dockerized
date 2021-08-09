import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "10a15739209945e9b73774d3bc289fce",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, [req.body.input])
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .select("*")
    .where({ id: id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Unable to get entries!"));
};

export { handleImage, handleApiCall };
