//USED AXIOS
let books = require("./booksdb.js");

const axios = require('axios');

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