import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import debounce from 'debounce';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';

class Search extends React.Component {
    state = {
        query: '',
        resultSet: []
    }

    updateQuery = debounce((query) =>  {

        if ( query ) {

            this.setState({resultSet:[]})
            this.setState({query:query.trim()})

            BooksAPI.search(query.trim()).then((res) => {

                if (res.length !== 0) {

                     this.setState({resultSet:res})
                }

            }).catch((error) => {
                console.log("Promise Reject");
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
                        onMoveShelf={this.props.onMoveShelf}
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

export default Search;