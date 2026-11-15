const express = require("express");
const app = express();

app.use(express.json());

// Sample book collection
let books = [
    { id: 1, title: "Wings of Fire", author: "A. P. J. Abdul Kalam" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// Home page
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Book Collection API</h1><p>Open /books to see all books.</p>");
});

// GET: Display all books
app.get("/books", (req, res) => {
    res.json(books);
});

// GET: Display one book
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// POST: Add a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Please enter both title and author"
        });
    }

    const newId = books.length === 0
        ? 1
        : Math.max(...books.map(b => b.id)) + 1;

    const newBook = {
        id: newId,
        title: title,
        author: author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT: Update a book
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Please enter both title and author"
        });
    }

    book.title = title;
    book.author = author;

    res.json({
        message: "Book updated successfully",
        book: book
    });
});

// DELETE: Remove a book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const bookExists = books.some(b => b.id === id);

    if (!bookExists) {
        return res.status(404).json({ message: "Book not found" });
    }

    books = books.filter(b => b.id !== id);
    res.json({ message: "Book deleted successfully" });
});

// Handle invalid URLs
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});
