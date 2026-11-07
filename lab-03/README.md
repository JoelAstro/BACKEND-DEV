# Lab 3: REST API, Query Parameters, Validation and Debugging

## 1. Student Details

- **Name:** Ramireddy Joel
- **Registration Number:** [252U1R5125]
- **Section:** [AIDE]
- **Course:** Backend Development Fundamentals
- **Year:** II Year
- **Term:** II Term

## 2. Objective

To develop a RESTful API using Node.js, Express.js and SQLite. The API supports CRUD operations, query parameters, searching, sorting, pagination, price filtering, input validation, appropriate HTTP status codes and debugging common backend errors.

## 3. Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript
- Postman
- Visual Studio Code
- Nodemon

## 4. Project Structure

```text
lab-03/
│
├── Screenshots/
├── node_modules/
├── app.js
├── database.js
├── bookStore.db
├── package.json
├── package-lock.json
└── README.md
```

## 5. Installation and Setup

### Step 1: Open the project folder

```bash
cd lab-03
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the development server

```bash
npm run dev
```

The server runs at:

`http://localhost:3000`

The application uses port 3000 by default. A different port can be configured using the `PORT` environment variable.

## 6. API Endpoints

Base URL: `http://localhost:3000`

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books?search_q=Alchemist` | Search books by title |
| GET | `/books?order_by=price&order=DESC` | Sort books by price |
| GET | `/books?limit=2&offset=0` | Pagination |
| GET | `/books?min_price=200` | Minimum price filter |
| GET | `/books?max_price=400` | Maximum price filter |
| GET | `/books?min_price=200&max_price=400` | Price range filter |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

## 7. Request Body Examples

### POST /books

```json
{
  "title": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "price": 399
}
```

### PUT /books/:id

```json
{
  "title": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "price": 499
}
```

## 8. Validation and HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Book created successfully |
| 400 | Invalid input or request data |
| 404 | Book not found |
| 500 | Internal server error |

The API validates required fields, numeric prices and book IDs. Error responses use JSON messages.

## 9. Debugging Tasks

The following common backend errors were reproduced and fixed:

1. **EADDRINUSE:** Port already in use. Resolved by running the server on another port.
2. **MODULE_NOT_FOUND:** Incorrect module import path. Fixed by using the correct database file path.
3. **SQLITE_ERROR:** Incorrect database table name. Fixed by correcting the table name.
4. **Missing await:** Database query returned a Promise instead of completed query results. Fixed by adding `await`.

## 10. Screenshots

All practical screenshots are available in the `Screenshots` folder.

### Server and GET Operations

![Server running](Screenshots/01-server-running.png)

![Get all books](Screenshots/02-get-all-books.png)

![Search books](Screenshots/03-search-books.png)

![Sort books](Screenshots/04-sort-books.png)

### Pagination and Price FiltersIM

![Pagination test 1](Screenshots/05-pagination-test-1.png)

![Pagination test 2](Screenshots/06-pagination-test-2.png)

![Minimum price filter](Screenshots/07-min-price-filter.png)

![Maximum price filter](Screenshots/08-max-price-filter.png)

![Price range filter](Screenshots/09-price-range-filter.png)

### POST and PUT Operations

![Create book](Screenshots/10-post-create-book.png)

![Missing title](Screenshots/11-post-missing-title.png)

![Missing author](Screenshots/12-post-missing-author.png)

![Invalid price](Screenshots/13-post-invalid-price.png)

![PUT route and server](Screenshots/14-put-route-server.png)

![Update book](Screenshots/15-put-update-book.png)

![Verify updated book](Screenshots/16-verify-updated-book.png)

![PUT book not found](Screenshots/17-put-book-not-found.png)

### DELETE Operations

![DELETE route and server](Screenshots/18-delete-route-server.png)

![Create temporary book](Screenshots/19-post-temporary-book.png)

![Delete book](Screenshots/20-delete-book.png)

![Verify deleted book](Screenshots/21-verify-deleted-book.png)

![Delete book not found](Screenshots/22-delete-book-not-found.png)

![Invalid book ID](Screenshots/23-delete-book-invalid-id.png)

### Debugging

![EADDRINUSE error](Screenshots/24-eaddrinuse-error.png)

![Port conflict fixed](Screenshots/25-eaddrinuse-port-fix.png)

![Wrong import error](Screenshots/26-wrong-import-error.png)

![Wrong import fixed](Screenshots/27-wrong-import-fixed.png)

![Wrong table error](Screenshots/28-wrong-table-error.png)

![Wrong table fixed](Screenshots/29-wrong-table-fixed.png)

![Missing await error](Screenshots/30-missing-await-error.png)

![Missing await fixed](Screenshots/31-missing-await-fixed.png)

## 11. Conclusion

Successfully developed and tested a RESTful Book Management API using Express.js and SQLite. Implemented GET, POST, PUT and DELETE operations, query parameters, pagination, price filtering, input validation and error handling. Also reproduced and resolved common backend debugging issues.