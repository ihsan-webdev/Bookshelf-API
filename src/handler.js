const { nanoid } = require("nanoid");
const bookshelf = require("./bookshelf");

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
  const finished = () => {
    if ((readPage = pageCount)) {
      finished = true;
      return finished;
    } else {
      finished = false;
      return finished;
    }
  };

  const newBookShelf = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  bookshelf.push(newBookShelf);

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else if ((bookshelf.name = null)) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (bookshelf.readPage > bookshelf.pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBookShelfHandler = () => ({
  status: "success",
  data: {
    bookshelf,
  },
});

const getBookByIdHandler=(request,h) =>{
    
}

module.exports = { addBookShelfHandler, getAllBookShelfHandler };
