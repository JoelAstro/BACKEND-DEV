# Lab 2: SQLite Database and CRUD Routes

## Student Details

- **Name:** Ramireddy Joel
- **Registration Number:** 252U1R5125
- **Section:** AIDE - 2B
- **Course:** Backend Development Fundamentals
- **Year / Term:** Year II / Term II

## Objective

To build a REST API using Node.js, Express.js, and SQLite to perform CRUD (Create, Read, Update, Delete) operations on a book database.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript
- Postman
- Visual Studio Code

## Project Structure

```text
lab-02/
├── app.js
├── bookStore.db
├── package.json
├── package-lock.json
├── README.md
└── screenshots/
```

## Database Details

**Database file:** `bookStore.db`

**Table:** `book`

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | TEXT | Book title |
| author | TEXT | Book author |
| price | INTEGER | Book price |
| pages | INTEGER | Number of pages |

## API Endpoints

The server runs locally at `http://localhost:3000`.

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/books/` | Retrieve all books | 200 OK |
| GET | `/books/:bookId/` | Retrieve a book by ID | 200 OK |
| POST | `/books/` | Add a new book | 201 Created |
| PUT | `/books/:bookId/` | Update a book by ID | 200 OK |
| DELETE | `/books/:bookId/` | Delete a book by ID | 200 OK |

The API uses SQL parameter placeholders (`?`) for user-provided values.

## Installation and Execution

### 1. Install dependencies

Open a terminal in the `lab-02` directory and run:

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The database connection is established before the Express server starts.

### 3. Access the API

Open the following URL in a browser:

```text
http://localhost:3000/books/
```

Use Postman to test the POST, PUT, and DELETE endpoints.

## Sample POST Request

**Method:** `POST`

**URL:** `http://localhost:3000/books/`

**Body — JSON:**

```json
{
  "title": "The 5 AM Club",
  "author": "Robin Sharma",
  "price": 400,
  "pages": 336
}
```

**Expected response:**

```json
{
  "message": "Book added successfully",
  "bookId": 11
}
```

## Screenshots

The `screenshots/` directory contains evidence of the project structure, database setup, server execution, API testing, and final database verification.

1. `01-project-structure.png`
2. `02-database-table.png`
3. `03-database-records.png`
4. `04-server-running.png`
5. `05-get-all-books.png`
6. `06-get-book-by-id.png`
7. `07-post-add-book.png`
8. `08-verify-added-book.png`
9. `09-put-update-book.png`
10. `10-verify-updated-book.png`
11. `11-delete-book.png`
12. `12-verify-deleted-book.png`
13. `13-final-database-verification.png`

## Learning Outcomes

- Connected an Express.js application to an SQLite database.
- Implemented GET, POST, PUT, and DELETE routes.
- Used SQL queries to retrieve and modify database records.
- Tested API endpoints using Postman.
- Verified database changes using SQLite.

## Repository

GitHub repository: [JoelAstro/Backend](https://github.com/JoelAstro/Backend)

**Note:** Run the server locally to test the APIs. The database file is included in this lab directory.
