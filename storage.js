const { MongoClient, ObjectId } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DATABASE || "bookstore";
const client = new MongoClient(url);

let books;

async function getBooksCollection() {
  if (!books) {
    await client.connect();
    books = client.db(dbName).collection("books");
  }
  return books;
}

async function createBook(book) {
  const collection = await getBooksCollection();
  const result = await collection.insertOne(book);
  return { _id: result.insertedId, ...book };
}

async function findBookById(id) {
  const collection = await getBooksCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

async function findAllBooks() {
  const collection = await getBooksCollection();
  return collection.find().toArray();
}

async function closeStorage() {
  await client.close();
  books = undefined;
}

module.exports = {
  createBook,
  findBookById,
  findAllBooks,
  closeStorage,
};