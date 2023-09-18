import { Rating } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { BookType } from "../../types/Book"
type BookProps = {
    book: BookType,
}
const Book = ({ book }: BookProps) => {
    const navigate = useNavigate()
    return (
        <div className="mb-5 col-lg-5 col-md-6">
            <div className="rounded row bg-white book">
                <div className="col-md-5 p-0 image">
                    <img src={`http://wfatairreact-001-site1.ctempurl.com/api/Images/${book.image}`} alt="" width={"100%"} height={"100%"} className="rounded book-img" />
                </div>
                <div className="col-md-6 text-center text-md-start ">
                    <div className="pt-4">
                        <div className="mb-2 ">
                            <div>
                                <h4 style={{ cursor: "pointer" }} className="book-name" onClick={() => {
                                    navigate(`book/details/${book.id}`)
                                }}>{book.name}</h4>
                                <span style={{ fontSize: "13px" }} className="text-black-50">by {book.author.name}</span>
                            </div>
                            <span style={{ fontSize: "13px" }} className="text-success fw-semibold">Category: {book.category.name}</span>
                        </div>
                        <div className="row justify-content-between mb-2">
                            <div className="col-xl-6 p-0">
                                <Rating name="read-only" value={3} readOnly />
                            </div>
                            <div className="col-xl-6 p-0">
                                <p className="text-black-50 text-center text-md-start text-xl-end" style={{ fontSize: "13px" }}>{book.id} votes</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ color: "#7bb2b2", fontSize: "15px" }}>
                                {book.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book
