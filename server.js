import express, { json } from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import morgan from "morgan";
import dotenv from "dotenv";

import handleSignup from "./controllers/signup.js";
import { signinAuthentication } from "./controllers/signin.js";
import {
  handleProfileGet,
  handleProfileUpdate,
} from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";
import { requireAuth } from "./controllers/auth.js";

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();

dotenv.config();
app.use(morgan("combined"));
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("success");
});
app.post("/signin", (req, res) => {
  signinAuthentication(req, res, db, bcrypt);
});
app.post("/signup", (req, res) => {
  handleSignup(req, res, db, bcrypt);
});
app.get("/profile/:id", requireAuth, (req, res) =>
  handleProfileGet(req, res, db)
);
app.post("/profile/:id", requireAuth, (req, res) =>
  handleProfileUpdate(req, res, db)
);
app.put("/image", requireAuth, (req, res) => handleImage(req, res, db));
app.post("/imageurl", requireAuth, (req, res) => handleApiCall(req, res));

app.listen(process.env.PORT || 3001, () => console.log("running on port 3001"));
