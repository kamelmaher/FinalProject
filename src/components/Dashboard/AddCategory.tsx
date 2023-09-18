import { useForm } from "react-hook-form"
import ApiClicent from "../../services/ApiClicent"

import { category } from "../../types/Book"
import { useEffect, useState } from "react"
import Modal from "../../Portals/Modal"
import { toast } from "react-toastify"
import TablePlaceHolder from "./TablePlaceHolder"
import UseFetch from "../../services/UseFetch"
type formData = {
    name: string
}
const AddCategory = () => {
    const { Books, isLoading: categoryLoading } = UseFetch<category[]>("/Category", [])
    const [Category, setCategory] = useState<category[]>([])
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(-1)
    const [addLoading, setAddLoading] = useState(false);
    const[isEditing , setIsEditing] = useState(false)
    const [editValue , setEditValue] = useState("")
    const [editId , setEditID] = useState(-1)
    useEffect(() => {
        setCategory(Books)
    }, [Books])
    const { register, handleSubmit, reset, formState: { errors } } = useForm<formData>()
    return (
        <div className="row w-75 m-auto justify-content-center">

            {/* Form */}
            <div className="col-6">
                <form onSubmit={handleSubmit(data => {
                    setAddLoading(true)
                    isEditing ?
                        ApiClicent.put("/Category/" + editId, { name: editValue }).then(data => {
                            console.log(data)
                            setAddLoading(false)
                            toast.success("Category Updated Successfully!")
                            reset()
                        })
                        :
                        ApiClicent.post("/Category", data).then(({ data }) => {
                            setCategory([...Category, data])
                            setAddLoading(false)
                            reset()
                            toast.success(`Category has been Added Successfully!`)
                        })
                })}>
                    <h3 className="mb-3 text-center fw-semibold">Add Category</h3>
                    <div>
                        <label className="mb-2">Name:</label>
                        {isEditing ? <input type="text" className="form-control" {...register("name", { required: true })} value={editValue} onChange={(e) => {
                            setEditValue(e.target.value)
                        }} />
                        :
                        <input type="text" className="form-control" {...register("name", { required: "true" })} />}
                    </div>
                    {errors.name?.type == "required" && <p className="text-danger">Category is required</p>}
                    {errors.name?.type == "minLength" && <p className="text-danger">Category is too small</p>}
                    <div className="mt-3 text-center">
                        <button className="btn btn-success">
                            {addLoading ?
                                <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </> : "Add"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="col-12" style={{
                width: "100%",
                overflowX: "auto",
            }}>{
                    categoryLoading ?
                        <TablePlaceHolder />
                        :
                        <table className="mt-4 table text-center" style={{
                            minWidth: "600px",
                        }}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Category</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Category.map((e, index) => {
                                return <tr key={e.id}>
                                    <td>{index + 1}</td>
                                    <td>{isEditing && e.id == editId ? editValue : e.name}</td>
                                    <td><button className="btn btn-outline-success" onClick={()=> {
                                        setIsEditing(true)
                                        setEditID(e.id)
                                        setEditValue(e.name)
                                    }}>Edit</button></td>
                                    <td><button className="btn btn-outline-danger" onClick={() => {
                                        setId(e.id)
                                        console.log(e.id)
                                        setShow(true)
                                    }}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
            </div>

            {/* Modal */}
            {show && <Modal onClose={() => setShow(false)} showModal={show} >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are You Sure ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShow(false)}>Close</button>
                        <button type="button" disabled={deleteLoading} className="btn btn-outline-danger" onClick={() => {
                            setDeleteLoading(true)
                            ApiClicent.delete(`/Category/${id}`).then(() => {
                                setDeleteLoading(false)
                                setCategory(Category.filter(e => e.id != id))
                                toast.success(`Category has been Deleted Successfully!`);
                                setShow(false)
                            }).catch(err => {
                                setDeleteLoading(false)
                                toast.warning(err.response.data.message)
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

export default AddCategory