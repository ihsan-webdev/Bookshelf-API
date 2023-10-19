const { nanoid } = require('nanoid');
const bookshelf = require('./bookshelf');

const addBookShelfHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBookShelf = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  bookshelf.push(newBookShelf);

  const isSuccess = bookshelf.filter((book) => book.id === id).length;
  const index = bookshelf.findIndex((book) => book.id === id);
  const book = bookshelf[index];

  if (book.name === undefined || book.name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (book.readPage > book.pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku.readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookShelfHandler = () => ({
  status: 'success',
  data: {
    bookshelf,
  },
});

module.exports = { addBookShelfHandler, getAllBookShelfHandler };
