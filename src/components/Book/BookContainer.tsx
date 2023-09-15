import Book from "./Book"
// import { useEffect, useState } from "react"
// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BookType } from "../../types/Book"
type BookContainerProps = {
    arr: BookType[],
}
const BookContainer = ({ arr }: BookContainerProps) => {
    return <> {
        arr.length > 0 ?
            <div className='row mt-5 justify-content-between pt-4'>
                {arr.map((e, index) => {
                    return <Book key={index} book={e} />
                })}
            </div> : <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <p className="text-danger text-center fs-3 mt-5">No Book Available</p>
                </div>
            </div>
    }
    </>
}

export default BookContainer;
