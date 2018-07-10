import React  from 'react';
import Book from './Book';
import PropTypes from 'prop-types';



function Bookshelf(props) {

    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.title}</h2>
            <ol className="books-grid">
              {props.books.map((b) => {
                  return (
                    <li key={b.id}>
                    <Book
                      book={b}
                      shelf={props.shelf}
                      onMoveShelf={props.onMoveShelf}
                    />
                  </li>
                  )

              })}

            </ol>

        </div>

    )
}


export default Bookshelf;