import React from 'react';

function Book(props) {
  //todo: book-cover props.book.imagelinks && addClass(no-cover)
    return (
        <div className="book">
          <div className="book-top">
          {props.book.imageLinks &&
             <div className="book-cover"
             style={{
                 width: 160,
                 height: 240,
                 backgroundImage: `url(${props.book.imageLinks.thumbnail}`,
                 overflow: 'hidden',
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover'
             }}
           />

          }


            <div className="book-shelf-changer">
              <select
                id={props.book.id}
                defaultValue={props.shelf}
                onChange={(event) => props.onMoveShelf(props.book, event.target.value)}
               >
                 <option value="0"> Move to...</option>
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