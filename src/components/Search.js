import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';

class Search extends React.Component {
    state = {
        query: '',
        resultSet: [],


    }

    updateQuery = debounce((query) =>  {

        if ( query ) {
<<<<<<< HEAD

            this.setState({resultSet:[]})
            this.setState({query:query.trim()})

=======
        
            this.setState({resultSet:[]})
            this.setState({query:query.trim()})
>>>>>>> 65d83885b6e50377f152d6c5fcd45d85ccadc793
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
    },300)

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
                        shelf={r.shelf}
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