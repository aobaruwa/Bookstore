/** Represents a book with its title, author, publication year, and genre. */
class Book {
    constructor(title, author, year, genre) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }

    getSummary() {
        return `${this.title} was written by ${this.author} in ${this.year}. Genre: ${this.genre}.`;
    }
}

module.exports = Book;
