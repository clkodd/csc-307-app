// backend.js
import express from "express";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => user["name"] === name && user["job"] === job);
};
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job == undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } 
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  }
  else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});


//
//First, implement a hard delete operation to remove a particular user by id from the list. 
// Hint: look at another HTTP method called DELETE. 
//And remember this: always try to reuse existing URL patterns. 
//Don't implement a route called '/delete-user'. 
//Look at the resource you want to access and perform the delete action (you may have a URL pattern for it already).

//Second, implement an additional action to get all users that match a given name and a given job. 
//Hint: look at what we did in step 4 and extend it.


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
