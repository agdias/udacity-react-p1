import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI  from './utils/BooksAPI';
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css';

class BooksApp extends React.Component {

    state = {
        books: []
    }

    shelves = [

        {name:"currentlyReading",title:"Currently Reading"},
        {name:"wantToRead",title:"Want to Read"},
        {name:"read",title:"read"},

    ]

    async componentDidMount() {

        try {
            const books = await BooksAPI.getAll()
            this.setState({ books })
        } catch(error) {
            console.log('Error: ', error);
        }
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
            <div className="app">
              <Route exact path="/" render = {() => (
                 <ListBooks 
                   shelves = {this.shelves}
                   books={this.state.books} 
                   onMoveShelf={this.onMoveShelfHandler} 
                />
                )} />
                <Route path="/search" render = {() => (
                  <SearchBooks 
                    books={this.state.books}
                    onMoveShelf={this.onMoveShelfHandler}
                  />
                )} />

              </div>
        )
    }
}

export default BooksApp;