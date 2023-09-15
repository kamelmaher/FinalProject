import { useEffect, useState } from 'react'
import './App.css'
import BookContainer from './components/Book/BookContainer';
// import ApiClicent from './services/ApiClicent';
import { BookType } from './types/Book';
import UseFetch from './UseFetch';
import PlaceHolder from './components/Book/PlaceHolder';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import logo from "../img/logo.jpeg"
// import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
function App() {
  const [active, setActive] = useState(0);
  const { Books, isLoading } = UseFetch<BookType[]>("/Book", []);
  const [selctedBooks, setSelectedBooks] = useState<BookType[]>([]);
  useEffect(() => {
    setSelectedBooks(Books);
  }, [Books]);
  // useEffect(() => {
  //   // ApiClicent.get<BookType[]>("/Book").then(({ data }) => {
  //     //   console.log(data)
  //     //   setBooks(data)
  //     //   setSelectedBooks(data)
  //     // })

  //   }, [])

  return (
    <>
      {/* <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className='text-center'><img src={logo} alt="" /></SwiperSlide>
        <SwiperSlide><img src={logo} alt="" /></SwiperSlide>
        <SwiperSlide><img src={logo} alt="" /></SwiperSlide>
        <SwiperSlide><img src={logo} alt="" /></SwiperSlide>
      </Swiper> */}
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
