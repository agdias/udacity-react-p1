import React from 'react';
import * as BooksAPI  from './utils/BooksAPI';
import Bookshelf from './components/Bookshelf';
import './App.css';

class BooksApp extends React.Component {

    state = {
        books: []
    }

    componentDidMount() {
      BooksAPI.getAll().then((response) => {
          console.log(response);
          this.setState(() => {
              return {
                  books:response
              }
          })
      }).catch((error) => {
          console.log("Error: ", error);
      })
    }

    onMoveShelfHandler  = (book,shelf) => {
        BooksAPI.update(book,shelf)
        .then(() => {
            const newBooks = this.state.books.filter(r => r.id !== book.id).concat([book]);
            book.shelf = shelf;
            this.setState(() => {
                return {
                    books:newBooks
                }
            })
        })
        .catch((error) => {
              console.log(error);
        })

    }



    render() {
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Bookshelf books={this.state.books.filter(b => b.shelf === "currentlyReading")} shelf="currentlyReading" onMoveShelf={this.onMoveShelfHandler}  title="Currently Reading"/>
                <Bookshelf books={this.state.books.filter(b => b.shelf === "wantToRead")} shelf="wantToRead" onMoveShelf={this.onMoveShelfHandler}  title="Want To Read"/>
                <Bookshelf books={this.state.books.filter(b => b.shelf === "read" )} shelf="read" onMoveShelf={this.onMoveShelfHandler} title="Read" />
              </div>
            </div>
        )
    }


}

export default BooksApp;