let books = require("./booksdb.js");

//USED AXIOS

const axios = require('axios');

//GET ALL BOOKS

const getBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("List Books:");
        console.log(response.data);
    } catch (error) {
        console.error("Error view books:", error.message);
    }
  };
  
  getBooks();

//GET BOOK FOR ISBN

  const getBookByIsbn = async (isbn) => {
      try {
          const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
          console.log("Book Found By ISBN:");
          console.log(response.data);
      } catch (error) {
          console.error("Error view book", error.message);
      }
  };
  
  getBookByIsbn("9783161484100"); // ISBN EXAMPLE

//GET BOOK FOR AUTHOR

  const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log("Book Found By Author:");
        console.log(response.data);
    } catch (error) {
        console.error("Error view book/s", error.message);
    }
};

getBookByAuthor("Hans Christian Andersen");// AUTHOR EXAMPLE
  

//GET BOOK FOR TITLE

const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log("Book Found By Title:");
        console.log(response.data);
    } catch (error) {
        console.error("Error view book/s", error.message);
    }
};

getBookByTitle("The Epic Of Gilgamesh");// TITLE EXAMPLE