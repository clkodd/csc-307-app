import express from "express";
import cors from "cors";
import USJS from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  USJS.getUsers(name, job)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send("Users not found.");
    });
});

app.get("/users/:id", (req, res) => {
  const userToFind = req.params["id"];
  USJS.findUserById(userToFind)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send("User not found.");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  USJS.addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Error adding user.");
    });
});

app.delete("/users/:id", (req, res) => {
  const userIdToDelete = req.params["id"];
  USJS.deleteUser(userIdToDelete)
    .then(() => {
      res.status(204).send("User deleted.");
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Error deleting user.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
