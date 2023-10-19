const { addBookShelfHandler, getAllBookShelfHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookShelfHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookShelfHandler,
  },
];

module.exports = routes;
