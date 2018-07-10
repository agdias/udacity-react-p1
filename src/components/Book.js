import React from 'react';

function Book(props) {
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                  width: 160,
                  height: 240,
                  backgroundImage: `url(${props.book.imageLinks.thumbnail}`,
                  overflow: 'hidden',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
              }}
            >
            </div>
            <div className="book-shelf-changer">
              <select
                id={props.book.id}
                defaultValue={props.shelf}
                onChange={(event) => props.onMoveShelf(props.book, event.target.value)}
               >
                 <option value="none"> Move to...</option>
                 <option value="currentlyReading"> CurrentlyReading</option>
                 <option value="wantToRead"> Want to Read</option>
                 <option value="read">Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{props.book.title}</div>
          <div className="book-authors">
            {props.book.authors.map(a => <p key={a}>{a}</p>)}
          </div>


        </div>

    )
}

export default Book;