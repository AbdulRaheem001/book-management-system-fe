import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navebar';
import './style.css';

interface Book {
  _id: string;
  bookId: {
    _id: string;
    title: string;
    authorName: string;
    genre: string;
  };
  shelfType: string;
}

interface BooksResponse {
  readingBooks: Book[];
  completedBooks: Book[];
  planToReadBooks: Book[];
}

const DashboardPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<string>('Plan to Read');
  const shelfOptions = ['Plan to Read', 'Reading', 'Completed'];
  const [books, setBooks] = useState<BooksResponse>({ readingBooks: [], completedBooks: [], planToReadBooks: [] });

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<BooksResponse>('http://localhost:3001/shelf/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  const handleShelfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShelf(event.target.value);
  };

  const moveBook = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming you store the token in localStorage
      const response = await axios.put('http://localhost:3001/shelf/move', {
        shelfType: selectedShelf,
        shelfEntryId: selectedBook?._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Book moved successfully:', response.data);
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error moving book:', error);
      // Handle error, display message, etc.
    }
  };

  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="flex justify-center items-center h-screen">
        <div className="books-container">
          <div className="books-row">
            <h2>Reading</h2>
            <div className="books-row-inner">{books.readingBooks.map(book => (
              <div key={book._id} className="book-card" onClick={() => openModal(book)}>
                <h3 className="book-title">{book.bookId.title}</h3>
                <p className="book-info">Author: {book.bookId.authorName}</p>
                <p className="book-info">Genre: {book.bookId.genre}</p>
                <p className="book-info">Shelf: {book.shelfType}</p>
              </div>
            ))}</div>
          </div>
          <div className="books-row">
            <h2>Plan To Read</h2>
            <div className="books-row-inner">{books.planToReadBooks.map(book => (
              <div key={book._id} className="book-card" onClick={() => openModal(book)}>
                <h3 className="book-title">{book.bookId.title}</h3>
                <p className="book-info">Author: {book.bookId.authorName}</p>
                <p className="book-info">Genre: {book.bookId.genre}</p>
                <p className="book-info">Shelf: {book.shelfType}</p>
              </div>
            ))}</div>
          </div>
          <div className="books-row">
            <h2>Completed</h2>
            <div className="books-row-inner">{books.completedBooks.map(book => (
              <div key={book._id} className="book-card" onClick={() => openModal(book)}>
                <h3 className="book-title">{book.bookId.title}</h3>
                <p className="book-info">Author: {book.bookId.authorName}</p>
                <p className="book-info">Genre: {book.bookId.genre}</p>
                <p className="book-info">Shelf: {book.shelfType}</p>
              </div>
            ))}</div>
          </div>
        </div>

        {showModal && selectedBook && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">{selectedBook.bookId.title}</h3>
              <p>Author: {selectedBook.bookId.authorName}</p>
              <p>Genre: {selectedBook.bookId.genre}</p>
              <p>Shelf: {selectedBook.shelfType}</p>
              <select value={selectedShelf} onChange={handleShelfChange}>
                {shelfOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <button onClick={moveBook} className="save-button">Save</button>
              <button onClick={closeModal} className="modal-close">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
