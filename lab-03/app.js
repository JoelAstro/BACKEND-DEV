
const express = require("express");
const initializeDB = require("./database");

const app = express();

app.use(express.json());

let db;

// GET /books - Retrieve, search, sort, paginate, and filter books
app.get("/books", async (request, response) => {
  try {
    const {
      search_q = "",
      order_by = "id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = request.query;

    const allowedColumns = ["id", "title", "author", "price"];

    if (!allowedColumns.includes(order_by)) {
      return response.status(400).json({
        message: "Invalid order_by parameter",
      });
    }

    const sortOrder = order.toUpperCase();

    if (!["ASC", "DESC"].includes(sortOrder)) {
      return response.status(400).json({
        message: "Order must be ASC or DESC",
      });
    }

    const pageLimit = Number(limit);
    const pageOffset = Number(offset);

    if (
      !Number.isInteger(pageLimit) ||
      pageLimit <= 0 ||
      !Number.isInteger(pageOffset) ||
      pageOffset < 0
    ) {
      return response.status(400).json({
        message: "Invalid limit or offset",
      });
    }

    const conditions = [];
    const values = [];

    if (search_q.trim() !== "") {
      conditions.push("title LIKE ?");
      values.push(`%${search_q}%`);
    }

    if (min_price !== undefined) {
      if (min_price.trim() === "" || !Number.isFinite(Number(min_price))) {
        return response.status(400).json({
          message: "min_price must be a valid number",
        });
      }

      conditions.push("price >= ?");
      values.push(Number(min_price));
    }

    if (max_price !== undefined) {
      if (max_price.trim() === "" || !Number.isFinite(Number(max_price))) {
        return response.status(400).json({
          message: "max_price must be a valid number",
        });
      }

      conditions.push("price <= ?");
      values.push(Number(max_price));
    }

    if (
      min_price !== undefined &&
      max_price !== undefined &&
      Number(min_price) > Number(max_price)
    ) {
      return response.status(400).json({
        message: "min_price cannot be greater than max_price",
      });
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const sqlQuery = `
      SELECT * FROM books
      ${whereClause}
      ORDER BY ${order_by} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    values.push(pageLimit, pageOffset);

    const books = await db.all(sqlQuery, values);

    response.status(200).json(books);
  } catch (error) {
    console.error("GET Error:", error.message);

    response.status(500).json({
      message: "Unable to retrieve books",
    });
  }
});

// POST /books - Add a new book
app.post("/books", async (request, response) => {
  try {
    const { title, author, price } = request.body || {};

    if (
      title === undefined ||
      author === undefined ||
      price === undefined
    ) {
      return response.status(400).json({
        message: "Title, author, and price are required",
      });
    }

    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      title.trim() === "" ||
      author.trim() === ""
    ) {
      return response.status(400).json({
        message: "Title and author must be valid text",
      });
    }

    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return response.status(400).json({
        message: "Price must be a valid non-negative number",
      });
    }

    const result = await db.run(
      `INSERT INTO books (title, author, price)
       VALUES (?, ?, ?)`,
      [title.trim(), author.trim(), price]
    );

    response.status(201).json({
      id: result.lastID,
      title: title.trim(),
      author: author.trim(),
      price: price,
    });
  } catch (error) {
    console.error("POST Error:", error.message);

    response.status(500).json({
      message: "Unable to add book",
    });
  }
});

// PUT /books/:id - Update an existing book
app.put("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, price } = request.body || {};

    // Validate book ID
    if (!/^[1-9]\d*$/.test(id)) {
      return response.status(400).json({
        message: "Invalid book ID",
      });
    }

    // Validate required fields
    if (
      title === undefined ||
      author === undefined ||
      price === undefined
    ) {
      return response.status(400).json({
        message: "Title, author, and price are required",
      });
    }

    // Validate title and author
    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      title.trim() === "" ||
      author.trim() === ""
    ) {
      return response.status(400).json({
        message: "Title and author must be valid text",
      });
    }

    // Validate price
    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return response.status(400).json({
        message: "Price must be a valid non-negative number",
      });
    }

    // Update book in database
    const result = await db.run(
      `UPDATE books
       SET title = ?, author = ?, price = ?
       WHERE id = ?`,
      [title.trim(), author.trim(), price, Number(id)]
    );

    // Check whether the book exists
    if (result.changes === 0) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    response.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error.message);

    response.status(500).json({
      message: "Unable to update book",
    });
  }
});

// DELETE /books/:id - Delete an existing book
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Validate book ID
    if (!/^[1-9]\d*$/.test(id)) {
      return response.status(400).json({
        message: "Invalid book ID",
      });
    }

    // Delete book from database
    const result = await db.run(
      "DELETE FROM books WHERE id = ?",
      [Number(id)]
    );

    // Check whether the book exists
    if (result.changes === 0) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    response.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error.message);

    response.status(500).json({
      message: "Unable to delete book",
    });
  }
});

// Start the server
const startServer = async () => {
  try {
    db = await initializeDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
};

module.exports = app;

startServer();
