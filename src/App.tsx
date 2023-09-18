import { useEffect, useState } from 'react'
import BookContainer from './components/Book/BookContainer';
import { BookType, category } from './types/Book';
import UseFetch from './services/UseFetch';
import PlaceHolder from './components/Book/PlaceHolder';

function App() {
  const [active, setActive] = useState(-1);
  const { Books, isLoading } = UseFetch<BookType[]>("/Book", []);
  const [selctedBooks, setSelectedBooks] = useState<BookType[]>([]);
  const { Books:category } = UseFetch<category[]>("/Category", [])
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
              <li className={`${active == -1 && "active"}`} onClick={() => {
                setSelectedBooks(Books)
                setActive(-1)
              }}>All Books</li>
              {category.map((e, index) => {
                return <li key={index + 1} className={`${active == index && "active"} filter`} onClick={() => {
                  setActive(index);
                  setSelectedBooks(e.name == "All Books" ? Books : Books.filter(t => t.category.name == e.name))
                }}>{e.name}</li>
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
