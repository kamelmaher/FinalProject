import Book from "./Book"
import { BookType } from "../../types/Book"
type BookContainerProps = {
    arr: BookType[],
}
const BookContainer = ({ arr }: BookContainerProps) => {
    return <>
        <div className='row mt-5 justify-content-between pt-4'>
            {
                arr.length > 0 ?
                    arr.map((e, index) => {
                        return <Book key={index} book={e} />
                    })
                    :
                    < div className="col-md-12">
                        <p className="text-danger text-center fs-3 mt-5">No Book Available</p>
                    </div>
            }
        </div >
    </>
}

export default BookContainer;
