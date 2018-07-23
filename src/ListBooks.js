import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Bookshelf from './components/Bookshelf'

function ListBooks(props) {
   
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf">
               {props.shelves.map(shelf =>
                    <Bookshelf
                      key={shelf.name}
                      shelf={shelf.name}
                      title={shelf.title}
                      books={props.books.filter(book => book.shelf === shelf.name)}
                      onMoveShelf={props.onMoveShelf}
                    />)}
              </div>
            </div>
            <div className="open-search">
            <Link to="/search">Add a Book</Link>
          </div>
          </div>            
        )
    
}

ListBooks.PropTypes = {
    books: PropTypes.array,
    onMoveShelf: PropTypes.func,
    shelf: PropTypes.string,
    title: PropTypes.string
}

export default ListBooks;