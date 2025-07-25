import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const BookItem = props => {
  const { bookDetails } = props;
  const { title, subtitle, isbn13, price, image } = bookDetails;
  
  return (
    <Link to={`/books/${isbn13}`} className="book-item-link">
      <div className="book-item">
        <img src={image} alt={title} className="book-image" />
        <div className="book-details">
          <h3 className="book-title">{title}</h3>
          <p className="book-subtitle">{subtitle}</p>
          <p className="book-price">{price}</p>
        </div>
      </div>
    </Link>
  );
};

const BookList = () => {
  // Convert state to useState hooks
  const [booksList, setBooksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  // Replace componentDidMount with useEffect
  useEffect(() => {
    getBooks();
  }, []);

  // Convert class method to regular function
  const getBooks = async () => {
    try {
      const sampleData = {
        "total": "48",
        "page": "1",
        "books": [
            {
                "title": "Practical MongoDB",
                "subtitle": "Architecting, Developing, and Administering MongoDB",
                "isbn13": "9781484206485",
                "price": "$32.04",
                "image": "https://itbook.store/img/books/9781484206485.png",
                "url": "https://itbook.store/books/9781484206485"
            },
            {
                "title": "The Definitive Guide to MongoDB, 3rd Edition",
                "subtitle": "A complete guide to dealing with Big Data using MongoDB",
                "isbn13": "9781484211830",
                "price": "$47.11",
                "image": "https://itbook.store/img/books/9781484211830.png",
                "url": "https://itbook.store/books/9781484211830"
            },
            {
                "title": "MongoDB in Action, 2nd Edition",
                "subtitle": "Covers MongoDB version 3.0",
                "isbn13": "9781617291609",
                "price": "$32.10",
                "image": "https://itbook.store/img/books/9781617291609.png",
                "url": "https://itbook.store/books/9781617291609"
            },
        ]
      };
      
      setBooksList(sampleData.books);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setIsLoading(false);
    }
  };

  // Convert event handler to regular function
  const onChangeSearchInput = event => {
    setSearchInput(event.target.value);
  };

  // Filter books based on search input
  const filteredBooksList = booksList.filter(book =>
    book.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="book-list-container">
        <h1 className="book-list-heading">All Books</h1>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search books"
            value={searchInput}
            onChange={onChangeSearchInput}
          />
        </div>
        
        {isLoading ? (
          <div className="loader-container">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <p className="results-count">{filteredBooksList.length} results found</p>
            <ul className="books-list">
              {filteredBooksList.map(book => (
                <li key={book.isbn13} className="book-item-container">
                  <BookItem bookDetails={book} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default BookList;