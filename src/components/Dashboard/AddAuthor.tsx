import { useForm } from "react-hook-form"
import ApiClicent from "../../services/ApiClicent"
import { author } from "../../types/Book"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from "../../Portals/Modal"
import TablePlaceHolder from "./TablePlaceHolder"
import UseFetch from "../../services/UseFetch"
const AddAuthor = () => {
    type formData = {
        name: string
    }
    const [author, setAuthor] = useState<author[]>([]);
    const { Books:Author, isLoading: AuthorLoading } = UseFetch<author[]>("/Author", []);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(-1);
    const [addLoading, setAddLoading] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [editId, setEditId] = useState(-1);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        setAuthor(Author)
    }, [Author])

    const { register, handleSubmit, reset, formState: { errors } } = useForm<formData>()
    
    return (
        <div className="row w-75 m-auto justify-content-center">
            <div className="col-6">
                <form onSubmit={handleSubmit(data => {
                    setAddLoading(true)
                    isEditing ?
                    ApiClicent.put("/Author/"+editId , {name: editValue}).then(data => {
                        console.log(data)
                        setAddLoading(false)
                        toast.success("Author Updated Successfully!")
                        reset()
                    })
                    :
                    ApiClicent.post("/Author", data).then(({ data }) => {
                        setAuthor([...author, data])
                        setAddLoading(false)
                        reset()
                        toast.success(`Author has been Added Successfully!`)
                    })
                })}>
                    <h3 className="mb-3 text-center fw-semibold">Add Author</h3>
                    <div>
                        <label className="mb-2">Name:</label>
                        {isEditing ? <input type="text" className="form-control" {...register("name", { required: true })} value={editValue} onChange={(e) => {
                            setEditValue(e.target.value)
                        }} />
                            :
                            <input type="text" className="form-control" {...register("name", { required: "true" })} />}
                    </div>
                    {errors.name?.type == "required" && <p className="text-danger">{errors.name.message}</p>}
                    <div className="mt-3 text-center">
                        <button className="btn btn-success" disabled={addLoading}>
                            {addLoading ?
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
            <div className="col-12" style={{
                maxWidth: "800px",
                overflowX: "auto",
            }}>{
                    AuthorLoading ?
                        <TablePlaceHolder />
                        :
                        <table className="mt-4 table text-center" style={{
                            minWidth: "600px",
                        }}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Author</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {author.map((e, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{isEditing && e.id == editId? editValue : e.name  }</td>
                                        <td><button className="btn btn-outline-success" onClick={() => {
                                            setIsEditing(true);
                                            setEditValue(e.name);
                                            setEditId(e.id);
                                        }}>Edit</button></td>
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
                        <button type="button" disabled={deleteLoading} className="btn btn-outline-danger" onClick={() => {
                            setDeleteLoading(true)
                            ApiClicent.delete(`/Author/${id}`).then(() => {
                                setAuthor(author.filter(e => e.id != id))
                                setDeleteLoading(false)
                                toast.success(`Author has been Deleted Successfully!`);
                                setShow(false)
                            })
                        }}>
                            {deleteLoading ? <>
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