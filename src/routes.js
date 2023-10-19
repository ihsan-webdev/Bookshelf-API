const {addBookShelfHandler, getAllBookShelfHandler} = require("./handler");

const routes = [
  {
    method: "POST",
    url: "/books",
    handler: addBookShelfHandler,
  },
  {
    method: "GET",
    url: "/books",
    handler: getAllBookShelfHandler
  },
  {
    method: "GET",
    url: "/books/{bookId}",
    handler: getAllBookShelfHandler
  },
];

module.exports = routes;
