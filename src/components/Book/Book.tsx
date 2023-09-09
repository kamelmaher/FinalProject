import { Rating } from "@mui/material"
import logo from "../../../img/logo.jpeg"
import { BookType } from "../../App"
import { Link } from "react-router-dom"
type BookProps = {
    Book: BookType,
}
const Book = ({ Book }: BookProps) => {
    return (
        <div className="mb-5 col-lg-5 col-md-6">
            <div className="rounded row pb-3 bg-white book">
                <div className="col-md-5 image">
                    <img src={logo} alt="" width={"100%"} className="rounded" />
                </div>
                <div className="col-md-6 text-center text-md-start ">
                    <div className="pt-4">
                        <div className="mb-2">
                            <Link style={{ display: "block" }} to={`book/details/${Book.id}`} className="fw-semibold" >{Book.name}</Link>
                            <span style={{ fontSize: "13px" }} className="text-black-50">by {Book.author}</span>
                        </div>
                        <div className="row justify-content-between mb-2">
                            <div className="col-xl-6 p-0">
                                <Rating name="read-only" value={Book.rating} readOnly />
                            </div>
                            <div className="col-xl-6 p-0">
                                <p className="text-black-50 text-center text-md-start text-xl-end" style={{ fontSize: "13px" }}>{Book.id} votes</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ color: "#7bb2b2", fontSize: "15px" }}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam a sequi eius.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book
