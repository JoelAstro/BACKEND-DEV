
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dbPath = "./bookStore.db";

const initializeDB = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price REAL NOT NULL
    );
  `);

  const result = await db.get(
    "SELECT COUNT(*) AS count FROM books"
  );

  if (result.count === 0) {
    await db.run(
      `INSERT INTO books (title, author, price)
       VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
      [
        "The Alchemist", "Paulo Coelho", 350,
        "Wings of Fire", "A.P.J. Abdul Kalam", 250,
        "Atomic Habits", "James Clear", 450,
      ]
    );
  }

  console.log("Database initialized successfully");

  return db;
};

module.exports = initializeDB;
