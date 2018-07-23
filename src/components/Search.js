import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';

class Search extends React.Component {
    state = {
        query: '',
        resultSet: [],


    }

    updateQuery = (query) =>  {

        if ( query ) {

            this.setState({resultSet:[]})
            this.setState({query:query.trim()})

            BooksAPI.search(query).then((books) => {
               books.map(book => (this.props.books.filter(b => b.id === book.id)).map((b => book.shelf = b.shelf)))
               this.setState({resultSet:books})
            }).catch ((error) => {
                console.log("Error: ", error)
            })
        } else {
            this.setState({resultSet: []})
            this.setState({query:''})
        }
    }

    render () {

        return (
            <div className="search-books">

              <div className="search-books-bar">

                  <Link className="close-search" to="/"></Link>

                  <div className="search-books-input-wrapper">
                    <DebounceInput
                       minLength={1}
                       debounceTimeout={300}
                       type="text"
                       name="query"
                       placeholder="Search by title or author"
                       value={this.state.query}
                       onChange={(event) => this.updateQuery(event.target.value)}
                    />
                  </div>
              </div>

                <div className="search-books-results">

                 <ol className="books-grid">
                  {(this.state.resultSet.length > 0) && this.state.resultSet.map((r) => (
                    <li key={r.id}>
                      <Book
                        book={r}
                        books={this.props.books}
                        onMoveShelf={this.props.onMoveShelf}
                        shelf={r.shelf? r.shelf : "none"}
                      />
                     </li>
                   )
                  )}
                 </ol>
                </div>
            </div>

        )
    }
}

Search.propTypes = {
    book: PropTypes.object,
    books: PropTypes.array,
    onMoveShelf: PropTypes.func,
    shelf: PropTypes.string
}
export default Search;