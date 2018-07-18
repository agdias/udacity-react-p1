import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from  'react-router-dom';
import * as BooksAPI  from './utils/BooksAPI';
import Bookshelf from './components/Bookshelf';
import Search from './components/Search';
import './App.css';

class BooksApp extends React.Component {

    state = {
        books: []
    }


    async componentDidMount() {
        try {
            const books = await BooksAPI.getAll()
            this.setState({ books })
        } catch(error) {
            console.log('Error: ', error);
        }
    }

    onMoveShelfHandler  = (book,shelf) => {
        console.log("fired")
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
            <div className="app">
              <Route exact path="/" render = {() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div className="bookshelf">
                      <Bookshelf books={this.state.books.filter(b => b.shelf === "currentlyReading")} shelf="currentlyReading" onMoveShelf={this.onMoveShelfHandler}  title="Currently Reading"/>
                      <Bookshelf books={this.state.books.filter(b => b.shelf === "wantToRead")} shelf="wantToRead" onMoveShelf={this.onMoveShelfHandler}  title="Want To Read"/>
                      <Bookshelf books={this.state.books.filter(b => b.shelf === "read" )} shelf="read" onMoveShelf={this.onMoveShelfHandler} title="Read" />
                    </div>
                  </div>
                  <div className="open-search">
                  <Link to="/search">Add a Book</Link>
                </div>
                </div>

                )} />
                <Route path="/search" render = {() => (
                    <div className="search-books">
                       <Search books={this.state.books} onMoveShelf={this.onMoveShelfHandler} />
                    </div>
                )} />

              </div>
        )
    }


}

export default BooksApp;