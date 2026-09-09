const express = require("express");
const Book = require("./resource");
const {
  createBook,
  findBookById,
  findAllBooks,
  closeStorage,
} = require("./storage");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/books", async (req, res) => {
  const books = await findAllBooks();
  res.json(books);
});

app.get("/books/:id", async (req, res) => {
  const book = await findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

app.post("/books", async (req, res) => {
  const { title, author, year, genre } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  const book = new Book(title, author, year, genre);
  const savedBook = await createBook(book);
  res.status(201).json(savedBook);
});

const server = app.listen(port, () => {
  console.log(`Book API listening at http://localhost:${port}`);
});

async function stopServer() {
  await closeStorage();
  server.close();
}

module.exports = { app, stopServer };

