import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import debounce from 'debounce';
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';

class Search extends React.Component {
    state = {
        query: '',
        resultSet: []
    }


    updateQuery = debounce((query) =>  {
        let showingBooks;
        if ( query ) {

            this.setState({ query: query.trim()});
            this.setState({resultSet:[]})
            BooksAPI.search(this.state.query).then((res) => {
                console.log("searching...")
                if (res.length !== 0) {

                    const match = new RegExp(escapeRegExp(this.state.query),'i');
                    showingBooks = res.filter((book) => match.test(book.title));

                    (showingBooks !==0 ) && this.setState({resultSet:showingBooks})
                } else {
                   console.log("nothing to show");
                }

            }).catch((error) => {
                 console.log(error);
            })

        } else {
            this.setState({resultSet: []})
            this.setState({query:''})
        }
    },100)

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
                  {(this.state.resultSet) && this.state.resultSet.map((r) => <li key={r.id}><Book book={r} onMoveShelf={this.props.onMoveShelf} /></li>) }
                 </ol>

                </div>
            </div>

        )
    }
}

export default Search;