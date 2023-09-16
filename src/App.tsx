import { useEffect, useState } from 'react'
import './App.css'
import BookContainer from './components/Book/BookContainer';
import { BookType } from './types/Book';
import UseFetch from './UseFetch';
import PlaceHolder from './components/Book/PlaceHolder';

function App() {
  const [active, setActive] = useState(0);
  const { Books, isLoading } = UseFetch<BookType[]>("/Book", []);
  const [selctedBooks, setSelectedBooks] = useState<BookType[]>([]);
  useEffect(() => {
    setSelectedBooks(Books);
  }, [Books]);
  return (
    <>
      <div className='row'>
      </div>
      <div className="container m-auto mt-4">
        <div className="row justify-content-between">
          <div className="col-md-4">
            <p className='fw-semibold fs-5 text-center text-md-start mb-2'>Popular by Genre </p>
          </div>
          <div className="col-md-8">
            <ul className='list-unstyled d-flex flex-wrap gap-3 tabs '>
              {["All Books", "Business", "Science", "Fiction", "Philosophy", "Biology"].map((e, index) => {
                return <li key={index} className={`${active == index && "active"}`} onClick={() => {
                  setActive(index);
                  setSelectedBooks(e == "All Books" ? Books : Books.filter(t => t.category.name == e))
                }}>{e}</li>
              })}
            </ul>
          </div>
        </div>
        {isLoading ?
          <div className="row">
            <PlaceHolder />
            <PlaceHolder />
            <PlaceHolder />
            <PlaceHolder />
            <PlaceHolder />
            <PlaceHolder />
          </div> :
          <>
            <BookContainer arr={selctedBooks} />
          </>
        }
      </div>
    </>
  )
}

export default App
