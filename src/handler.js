const { nanoid } = require('nanoid');
const bookShelf = require('./bookshelf');

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

  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBookShelf = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookShelf.push(newBookShelf);

  const isSuccess = bookShelf.filter((book) => book.id === id).length;

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

const getAllBookShelfHandler = (request, h) => {
  const { name, finished, reading } = request.query;

  if (name !== undefined) {
    const newBooks = bookShelf.filter(
      (books) => books.name.toLowerCase().includes(name.toLowerCase()) === true
    );
    const books = newBooks.map(
      ({
        year,
        author,
        summary,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
        ...restBookShelf
      }) => {
        const rest = restBookShelf;
        return rest;
      }
    );

    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  }

  if (finished === '1') {
    const newBooks = bookShelf.filter((books) => books.finished === true);

    const books = newBooks.map(
      ({
        year,
        author,
        summary,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
        ...restBookShelf
      }) => {
        const rest = restBookShelf;
        return rest;
      }
    );

    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }

  if (finished === '0') {
    const newBooks = bookShelf.filter((books) => books.finished === false);

    const books = newBooks.map(
      ({
        year,
        author,
        summary,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
        ...restBookShelf
      }) => {
        const rest = restBookShelf;
        return rest;
      }
    );

    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }

  if (reading === '1') {
    const newBooks = bookShelf.filter((books) => books.reading === true);

    const books = newBooks.map(
      ({
        year,
        author,
        summary,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
        ...restBookShelf
      }) => {
        const rest = restBookShelf;
        return rest;
      }
    );

    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }

  if (reading === '0') {
    const newBooks = bookShelf.filter((books) => books.reading === false);

    const books = newBooks.map(
      ({
        year,
        author,
        summary,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
        ...restBookShelf
      }) => {
        const rest = restBookShelf;
        return rest;
      }
    );

    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }

  const books = bookShelf.map(
    ({
      year,
      author,
      summary,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
      ...restBookShelf
    }) => {
      const rest = restBookShelf;
      return rest;
    }
  );

  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = bookShelf.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params;
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
  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const updatedAt = new Date().toISOString();

  const index = bookShelf.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookShelf[index] = {
      ...bookShelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = bookShelf.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookShelf.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookShelfHandler,
  getAllBookShelfHandler,
  getBookShelfByIdHandler,
  editBookShelfByIdHandler,
  deleteBookShelfByIdHandler,
};
