# Bookstore API

An Express RestAPI for creating and reading books stored in MongoDB.

## Requirements

- Node.js 18 or later
- A running MongoDB server

Install package dependencies:

```bash
npm install
```

By default, the API connects to MongoDB at `mongodb://127.0.0.1:27017` and uses the `bookstore` database with a `books` collection.

Configure another MongoDB instance or database with environment variables:

```bash
MONGODB_URI="mongodb://127.0.0.1:27017" MONGODB_DATABASE="bookstore" npm start
```

## Run Locally

Start the API:

```bash
npm start
```

The API listens on `http://localhost:3000` by default. Set `PORT` to choose another port:

```bash
PORT=4000 npm start
```

## API Endpoints

### List Books

```http
GET /books
```

Example:

```bash
curl http://localhost:3000/books
```

Response: `200 OK`

```json
[
  {
    "_id": "6aa1037c3345a10f8f2aadf0",
    "title": "Learn REST APIs",
    "author": "John Doe",
    "year": 2024,
    "genre": "Education"
  }
]
```

### Get One Book

```http
GET /books/:id
```

Example:

```bash
curl http://localhost:3000/books/6aa1037c3345a10f8f2aadf0
```

Response: `200 OK` with the matching book, or `404 Not Found` when no book has that MongoDB `_id`.

### Create a Book

```http
POST /books
Content-Type: application/json
```

Request body fields:

| Field | Type | Required |
| --- | --- | --- |
| `title` | string | Yes |
| `author` | string | Yes |
| `year` | number | No |
| `genre` | string | No |

Example:

```bash
curl -i -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","year":1965,"genre":"Science fiction"}'
```

Response: `201 Created`

```json
{
  "_id": "...",
  "title": "Dune",
  "author": "Frank Herbert",
  "year": 1965,
  "genre": "Science fiction"
}
```

Requests without `title` or `author` return `400 Bad Request`.

## External Applications

An external application talks to this API over HTTP. It does not connect to MongoDB directly.

For a server-side Node.js application, use `fetch` with the address of the deployed API:

```js
const response = await fetch("https://api.example.com/books", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    genre: "Science fiction",
  }),
});

const book = await response.json();
```

For a browser application, deploy this API to a publicly reachable HTTPS URL and enable CORS in `functions.js` for the browser application's origin. Do not expose the MongoDB connection URL to browser code.

## Project Files

- `functions.js`: Express routes and HTTP server.
- `Bookstore/resource.js`: `Book` constructor used to create book documents.
- `Bookstore/storage.js`: MongoDB connection and book storage functions.
