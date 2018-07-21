import React from 'react';

function Book(props) {



    return (
        <div className="book">
          <div className="book-top">
          { (props.book.imageLinks && props.book.imageLinks.thumbnail)  &&
             <div className="book-cover"
             style={{
                 width: 142,
                 height: 205,
                 backgroundImage: `url(${props.book.imageLinks.thumbnail}`,
                 overflow: 'hidden',
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'contain'

             }}
           />

          }


            <div className="book-shelf-changer">
              <select
                id={props.book.id}
                defaultValue={props.shelf || 'none'}
                onChange={(event) => props.onMoveShelf(props.book, event.target.value)}
               >
                 <option value="0" disabled> Move to...</option>
                 <option value="currentlyReading"> CurrentlyReading</option>
                 <option value="wantToRead"> Want to Read</option>
                 <option value="read">Read</option>
                 <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{props.book.title}</div>
          {(props.book.authors) &&
            <div className="book-authors">
            {props.book.authors.map(a => <p key={a}>{a}</p>)}
          </div>
          }



        </div>

    )
}

export default Book;