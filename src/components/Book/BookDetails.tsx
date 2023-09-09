import { useParams } from "react-router-dom";
import { BookType, Books } from "../../App"
import { useEffect, useState } from "react";
import Book from "./Book";
// import { useAppSelector } from "../../store/store";

const BookDetails = () => {
    const { bookid } = useParams();
    const [selectedBook, setSelectedBook] = useState({} as BookType)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const myBook = Books.find(e => e.id === parseInt(bookid!))
            setSelectedBook(myBook!);
            setIsLoading(false);
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const myBook = useAppSelector(state => state.book)
    return (
        <>

            {isLoading ? <p>Loading</p> :
                <div className="row  justify-content-center mt-4">
                    <div className="col-md-9 d-flex justify-content-center mt-4">
                        <Book Book={selectedBook} />
                    </div>
                </div>
            }
        </>
    )
}

export default BookDetails;
