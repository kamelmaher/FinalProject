import { BookType } from "../../types/Book"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiClicent from "../../services/ApiClicent"
import Modal from "../../Portals/Modal"
import TablePlaceHolder from "./TablePlaceHolder"
import UseFetch from "../../services/UseFetch"

const Books = () => {
    const [id, setId] = useState(-1)
    const [myBooks, setMyBooks] = useState<BookType[]>([])
    const { Books: books, isLoading } = UseFetch<BookType[]>("/Book", [])
    const [show, setShow] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    useEffect(() => {
        setMyBooks(books);
    }, [books])
    return <>
        {isLoading ? <>
            <TablePlaceHolder />
            <TablePlaceHolder />
        </> :
            <div style={{
                overflowX: "auto",
                width: "100%"
            }}
            >
                <table className="table text-center" style={{
                    minWidth: "800px",
                }}>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Publish Year</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBooks.map((e, index) => {
                            return <tr key={index} >
                                <td>{index + 1}</td>
                                <td><NavLink to={`/book/details/${e.id}`} className={"fw-semibold text-success"} style={{ textDecoration: "none" }}>{e.name}</NavLink></td>
                                <td className="fw-semibold">${e.price}</td>
                                <td>{e.publishYear}</td>
                                <td>{e.category.name}</td>
                                <td>{e.author.name}</td>
                                <td><NavLink className="btn btn-success" to={`/dashboard/edit/${e.id}`}>Edit</NavLink></td>
                                <td><button className="btn btn-outline-danger" onClick={() => {
                                    setShow(true)
                                    setId(e.id)
                                }}>Delete</button></td>

                            </tr>
                        })}
                    </tbody>
                </table>
                {show && <Modal onClose={() => setShow(false)} showModal={show} >
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are You Sure ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShow(false)}>Close</button>
                            <button type="button" className="btn btn-outline-danger" disabled={deleteLoading} onClick={() => {
                                setDeleteLoading(true)
                                console.log(id)
                                ApiClicent.delete(`/Book/${id}`).then(() => {
                                    setDeleteLoading(false)
                                    setMyBooks(books.filter(e => e.id != id))
                                    toast.success(`Book Deleted Successfully!   `);
                                    setShow(false)
                                })
                            }}>
                                {deleteLoading ? <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </> : "Delete"}
                            </button>
                        </div>
                    </div>
                </Modal>}
            </div>
        }
    </>
}

export default Books