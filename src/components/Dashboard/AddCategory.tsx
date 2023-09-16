import { useForm } from "react-hook-form"
import ApiClicent from "../../services/ApiClicent"
import UseFetch from "../../UseFetch"
import { category } from "../../types/Book"
import { useEffect, useState } from "react"
import Modal from "../../Portals/Modal"
import { toast } from "react-toastify"
import TablePlaceHolder from "./TablePlaceHolder"
type formData = {
    name: string
}
const AddCategory = () => {
    const { Books, isLoading: categoryLoading } = UseFetch<category[]>("/Category", [])
    const [Category, setCategory] = useState<category[]>([])
    const [ModalLoading, setModalLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(-1)
    const [addLoading, setAddLoading] = useState(false);
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
                    ApiClicent.post("/Category", data).then(({ data }) => {
                        setCategory([...Category, data])
                        setAddLoading(false)
                        toast.success("Category has been Added Successfully!");
                        reset()
                    })
                })}>
                    <h3 className="mb-3 text-center fw-semibold">Add Category</h3>
                    <div>
                        <label className="mb-2">Name:</label>
                        <input type="text" className="form-control" {...register("name", { required: "true", minLength: 5 })} />
                    </div>
                    {errors.name?.type == "required" && <p className="text-danger">Category is required</p>}
                    {errors.name?.type == "minLength" && <p className="text-danger">Category is too small</p>}
                    <div className="mt-3 text-center">
                        <button className="btn btn-primary">
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
            <div className="col-12">
                {categoryLoading ?
                    <TablePlaceHolder />
                    :
                    <table className="table mt-4 text-center">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Category</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Category.map((e, index) => {
                                return <tr key={e.id}>
                                    <td>{index + 1}</td>
                                    <td>{e.name}</td>
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
                        <button type="button" disabled={ModalLoading} className="btn btn-outline-danger" onClick={() => {
                            setModalLoading(true)
                            ApiClicent.delete(`/Category/${id}`).then(() => {
                                setModalLoading(false)
                                setCategory(Category.filter(e => e.id != id))
                                toast.success(`Category has been Deleted Succefully!`);
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

export default AddCategory