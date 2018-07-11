import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
    state = {
        query: ''
    }
    render () {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                  <Link className="close-search" to="/"></Link>
                  <div className="search-books-input-wrapper">
                    <input
                     type="text"
                     name="query"
                     placeHolder="Search by title or author"
                     value={this.state.query}
                    />

                  </div>
              </div>
            </div>
        )
    }
}

export default Search;