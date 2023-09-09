import { useState } from 'react'
import './App.css'
import BookContainer from './components/Book/BookContainer';
export type BookType = {
  id: number
  name: string,
  author: string,
  rating: number,
  category: "Business" | "Science" | "Fiction" | "Phioilogy" | "Biology";

}
export const Books: BookType[] = [{
  id: 1,
    name: "Science Book",
    author: "Kamel Maher",
    category: "Science",
    rating: 3
  },
  {
    id: 2,
    name: "Business Book",
    author: "Ronaldo",
    category: "Business",
    rating: 4
  },
  {
    id: 3,
    name: "Fiction Book",
    author: "Messi",
    category: "Fiction",
    rating: 3
  },
  {
    id: 4,
    name: "Biology Book",
    author: "Karim Benzema",
    category: "Biology",
    rating: 1
  },
  {
    id: 5,
    name: "Phisiology Book",
    author: "Kamel Maher",
    category: "Phioilogy",
    rating: 5
  },
  {
    id: 6,
    name: "Science Book",
    author: "Kamel Maher",
    category: "Science",
    rating: 3
  },
  {
    id: 7,
    name: "Business Book",
    author: "Ronaldo",
    category: "Business",
    rating: 4
  },
  {
    id: 8,
    name: "Fiction Book",
    author: "Messi",
    category: "Fiction",
    rating: 3
  },
  {
    id: 9,
    name: "Biology Book",
    author: "Karim Benzema",
    category: "Biology",
    rating: 1
  },
  {
    id: 10,
    name: "Phisiology Book",
    author: "Kamel Maher",
    category: "Phioilogy",
    rating: 5
  },]
function App() {
  const [active, setActive] = useState(0);
  const [selctedBooks, setSelectedBooks] = useState<BookType[]>(Books);
  return (
    <>
      <div className="mt-4 container m-auto">
        <div className="row justify-content-between">
          <div className="col-md-4">
            <p className='fw-semibold fs-5 text-center text-md-start mb-2'>Popular by Genre </p>
          </div>
          <div className="col-md-8">
            <ul className='list-unstyled d-flex flex-wrap gap-3 tabs '>
              {["All Books", "Business", "Science", "Fiction", "Phioilogy", "Biology"].map((e, index) => {
                return <li key={index} className={`${active == index && "active"}`} onClick={() => {
                  setActive(index);
                  setSelectedBooks(e == "All Books" ? Books : Books.filter(t => t.category == e));
                }}>{e}</li>
              })}
            </ul>
          </div>
        </div>
        <BookContainer arr={selctedBooks} />
      </div>
    </>
  )
}

export default App
