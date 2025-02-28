const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => users.some(user => user.username === username);

const authenticatedUser = (username, password) =>
  users.some(user => user.username === username && user.password === password);

regd_users.post("/login", (req, res) => {
  console.log("Usuarios en memoria:", users);  // <-- DEPURACIÓN
  console.log(`Intentando login con -> username: ${req.body.username}, password: ${req.body.password}`);

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});


module.exports = { authenticated: regd_users, users, isValid };
