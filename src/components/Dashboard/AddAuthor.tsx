import { useForm } from "react-hook-form"
import ApiClicent from "../../services/ApiClicent"
import UseFetch from "../../UseFetch"
import { author } from "../../types/Book"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from "../../Portals/Modal"
import TablePlaceHolder from "./TablePlaceHolder"
const AddAuthor = () => {
    type formData = {
        name: string
    }
    const [author, setAuthor] = useState<author[]>([])
    const { Books, isLoading: CategoryModalLoading } = UseFetch<author[]>("/Author", [])
    const [ModalLoading, setModalModalLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(-1)
    const [addModalLoading, setAddModalLoading] = useState(false);
    useEffect(() => {
        setAuthor(Books)
    }, [Books])
    const { register, handleSubmit, reset, formState: { errors } } = useForm<formData>()
    return (
        <div className="row w-75 m-auto justify-content-center">
            <div className="col-6">
                <form onSubmit={handleSubmit(data => {
                    setAddModalLoading(true)
                    ApiClicent.post("/Author", data).then(({ data }) => {
                        setAuthor([...author, data])
                        setAddModalLoading(false)
                        reset()
                        toast.success("Author has been Added Successfully!")
                    })
                })}>
                    <h3 className="mb-3 text-center fw-semibold">Add Author</h3>
                    <div>
                        <label className="mb-2">Name:</label>
                        <input type="text" className="form-control" {...register("name", { required: "true" })} />
                    </div>
                    {errors.name?.type == "required" && <p className="text-danger">{errors.name.message}</p>}
                    <div className="mt-3 text-center">
                        <button className="btn btn-primary" disabled={addModalLoading}>
                            {addModalLoading ?
                                <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </>
                                : "Add"
                            }
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-12">{
                CategoryModalLoading ?
                    <TablePlaceHolder />
                    :
                    <table className="table mt-4 text-center">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Author</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {author.map((e, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{e.name}</td>
                                    <td><button className="btn btn-outline-danger" onClick={() => {
                                        setShow(true)
                                        setId(e.id)
                                    }}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
            }
            </div>

            {/* Modal */}
            {show && <Modal onClose={() => setShow(false)} showModal={show} >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Author</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are You Sure ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShow(false)}>Close</button>
                        <button type="button" disabled={ModalLoading} className="btn btn-outline-danger" onClick={() => {
                            setModalModalLoading(true)
                            ApiClicent.delete(`/Author/${id}`).then(() => {
                                setAuthor(author.filter(e => e.id != id))
                                setModalModalLoading(false)
                                toast.success(`Author has been Deleted Succefully!`);
                                setShow(false)
                            })
                        }}>
                            {ModalLoading ? <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </>
                                : "Delete"
                            }
                        </button>
                    </div>
                </div>
            </Modal>}
        </div>
    )
}

export default AddAuthor