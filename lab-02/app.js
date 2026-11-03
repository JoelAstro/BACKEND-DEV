
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "bookStore.db");

let db = null;

// API 1: Get all books
app.get("/books/", async (request, response) => {
  try {
    const books = await db.all("SELECT * FROM book");

    response.status(200).send(books);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// API 2: Get a single book by ID
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const book = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [bookId]
    );

    if (book === undefined) {
      response.status(404).send({ error: "Book not found" });
    } else {
      response.status(200).send(book);
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// API 3: Add a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    const result = await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?)`,
      [title, author, price, pages]
    );

    response.status(201).send({
      message: "Book added successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});


// API 4: Update a book by ID
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const existingBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [bookId]
    );

    if (existingBook === undefined) {
      return response.status(404).send({ error: "Book not found" });
    }

    await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?`,
      [title, author, price, pages, bookId]
    );

    response.status(200).send({
      message: "Book updated successfully"
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});


// API 5: Delete a book by ID
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const existingBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [bookId]
    );

    if (existingBook === undefined) {
      return response.status(404).send({ error: "Book not found" });
    }

    await db.run(
      "DELETE FROM book WHERE id = ?",
      [bookId]
    );

    response.status(200).send({
      message: "Book deleted successfully"
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// Initialize database and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

module.exports = app;
