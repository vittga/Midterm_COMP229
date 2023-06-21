// File name: books.js
// Author: Vittoria Garcia Cardias
// Student ID: 300970112

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

// Renders book details page
    res.render('books/details',{
      title: 'Add Book',
      books: '',
      action: 'books/add'
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

// Add new book to the database, once done redirects user to list page
    let newBook = new book ({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    });
    book.create(newBook, (err, bookCreated) =>
    {
      if (err) {
        res.end(err);
      }
      else {
        res.redirect('/books');
      }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

// Renders book details page from database using id
    let id = req.params.id;
  book.findById(id, (err, editBooks) => {
    if (err) {
      res.end(err);
    }
    else {
      res.render('books/details', {
        title: 'Edit Book', 
        books: editBooks,
        action: ''
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

// Update list with new book and redirects user to book list page when done
    let id = req.params.id;
    let updateBook = new book ({_id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
    });
    book.updateOne({_id: id}, updateBook,(err) => {
      if (err) {
        res.end(err);
      }
      else {
        res.redirect('/books');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

// Remove a book from list
    let id = req.params.id;
    book.remove({_id: id }, (err) => {
      if (err) {
        res.end(err);
      }
      else {
        res.redirect('/books');
      }
    });
});


module.exports = router;
