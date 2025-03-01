const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
let reviews = {};

const isValid = (username) => users.some(user => user.username === username);

const authenticatedUser = (username, password) =>
  users.some(user => user.username === username && user.password === password);

regd_users.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ username: username }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here    
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user?.username;

  if (!review) {
      return res.status(400).json({ message: "The review cannot be empty." });
  }

  if (!username) {
      return res.status(401).json({ message: "Unauthorized. Sign in first." });
  }

  if (!reviews[isbn]) {
      reviews[isbn] = [];
  }

  const existingReviewIndex = reviews[isbn].findIndex(r => r.username === username);

  if (existingReviewIndex !== -1) {

    reviews[isbn][existingReviewIndex].review = review;
      res.json({ message: "Review updated successfully." });
  } else {

      reviews[isbn].push({ username, review });
      res.json({ message: "Review successfully added." });
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user?.username;

  if (!username) {
      return res.status(401).json({ message: "Unauthorized. Sign in first." });
  }

  if (!reviews[isbn]) {
      return res.status(404).json({ message: "No reviews found for this book." });
  }

  const reviewIndex = reviews[isbn].findIndex(r => r.username === username);

  if (reviewIndex !== -1) {
      reviews[isbn].splice(reviewIndex, 1);
      return res.json({ message: "Review deleted successfully." });
  } else {
      return res.status(404).json({ message: "Review not found for this user." });
  }
});

module.exports = { authenticated: regd_users, users, isValid };
