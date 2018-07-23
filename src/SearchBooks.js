import React from 'react';
import PropTypes from 'prop-types'
import Search from './components/Search'

function SearchBooks(props) {
   
        return (
        
            <div className="search-books">
            <Search 
              books={props.books} 
              onMoveShelf={props.onMoveShelf}
             />
         </div>
        )
    
}

SearchBooks.propTypes = {
    books: PropTypes.array,
    onMoveShelf: PropTypes.func
}

export default SearchBooks;