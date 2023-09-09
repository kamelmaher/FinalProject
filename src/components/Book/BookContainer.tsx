import Book from "./Book"
import { BookType } from "../../App"
import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type BookContainerProps = {
    arr: BookType[],
}
const BookContainer = ({ arr }: BookContainerProps) => {
    const [loading , setLoading] = useState(true)
    setTimeout(()=> {
        setLoading(false)
    }, 2000)
    useEffect(()=> {
        setLoading(true);
    } , [arr])
    
    return <>
        {
            loading ? <div className="row mt-5">
                <div className="col-md-6 mb-3">
                    <Skeleton count={4} />
                </div>
                <div className="col-md-6 mb-3">
                    <Skeleton count={4} />
                </div>
                <div className="col-md-6 mb-3">
                    <Skeleton count={4} />
                </div>
                <div className="col-md-6 mb-3">
                    <Skeleton count={4} />
                </div>
            </div> : <div className='row mt-5 justify-content-between pt-4'>
                {arr.map((e, index) => {
                    return <Book key={index} Book={e}  />
                })}
            </div>
        }
    </>
}

export default BookContainer;
