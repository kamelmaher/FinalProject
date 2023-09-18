import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import ApiClicent from "../../services/ApiClicent"
import { useNavigate, useParams } from "react-router-dom"
import { BookType, author, category } from "../../types/Book"
import { toast } from "react-toastify"
import UseFetch from "../../services/UseFetch"

const EditBook = () => {
    const MAX_FILE_SIZE = 500000;
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];
    const schema = z.object({
        Name: z.string().nonempty({ message: "Name is required" }).min(6, { message: "Name should be 6 char at Least" }),
        Price: z.number().min(10, { message: "Price is Required" }),
        About: z.string().min(10, { message: "description is Required" }),
        PublishYear: z.number().min(10, { message: "Publish Year is Required" }),
        PageCount: z.number().min(10, { message: "Page Count is Required" }),
        ImageFile: z
            .instanceof(FileList)
            .refine((files) => files?.length == 1, "Image is required.")
            .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
            .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), ".jpg, .jpeg, .png and .webp files are accepted."),
    })
    type BookFormData = z.infer<typeof schema>
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<BookFormData>({
        resolver: zodResolver(schema),
    })
    const { bookid } = useParams()
    const [book, setBook] = useState<BookType>({} as BookType);
    const [isLoading, setIsLoading] = useState(true)
    const [editLoading, setEditLoading] = useState(false)
    const { Books: category, isLoading: categoryLoading } = UseFetch<category[]>("/Category", [])
    const { Books: author, isLoading: authorLoading } = UseFetch<author[]>("/Author", [])
    const [selectedAuthor, setSelectedAuthor] = useState(-1)
    const [selectedCategory, setSelectedCategory] = useState(-1)
    useEffect(() => {
        setIsLoading(true);
        ApiClicent.get(`/Book/${bookid}`).then(({ data }) => {
            setValue("ImageFile", data.image[0])
            setValue("Name", data.name)
            setSelectedAuthor(data.author.id)
            setSelectedCategory(data.category.id)
            setBook(data)
            setIsLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const navigate = useNavigate()
    return <>
        {
            !isLoading && <div className="row justify-content-center">
                <div className="col-md-10">
                    <form onSubmit={handleSubmit(data => {
                        console.log(selectedAuthor)
                        console.log(selectedCategory)
                        const formData = new FormData();
                        formData.append("Name", data.Name)
                        formData.append("Price", data.Price + "")
                        formData.append("About", data.About)
                        formData.append("PublishYear", String(data.PublishYear))
                        formData.append("PageCount", String(data.PageCount))
                        formData.append("image", data.ImageFile[0])
                        formData.append("AuthorId", selectedAuthor + "")
                        formData.append("PublisherId", 1 + "")
                        formData.append("CategoryId", selectedCategory + "")
                        setEditLoading(true)
                        ApiClicent.put(`/Book/${book.id}`, formData).then(() => {
                            setEditLoading(false)
                            toast.success("Book Updated Successfully!")
                            navigate("/dashboard")
                        })
                    })}>
                        <h4 className=" text-center">Edit Book</h4>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="">
                                    <label className="form-label mb-1 fw-semibold">Name:</label>
                                    <input {...register("Name")} type="text" className="form-control" onChange={(e) => {
                                        setBook({ ...book, name: e.target.value })
                                    }} />
                                    {errors.Name?.message && <p className="text-danger">{errors.Name.message}</p>}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="">
                                    <label className="form-label mb-1 fw-semibold">Image:</label>
                                    <input type="file" accept="image/*" {...register("ImageFile")} className="form-control" />
                                    {errors.ImageFile?.message && <p className="text-danger mt-2">{errors.ImageFile.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 p-2">
                                <div className="">
                                    <label className="form-label mb-1 fw-semibold">price:</label>
                                    <input {...register("Price", { valueAsNumber: true })} type="number" className="form-control" value={book.price} onChange={(e) => {
                                        setBook({ ...book, price: parseInt(e.target.value) })
                                    }} />
                                    {errors.Price?.message && <p className="text-danger">{errors.Price.message}</p>}
                                </div>
                            </div>
                            <div className="col-lg-6 p-2">
                                <div>
                                    <label className="form-label mb-1 fw-semibold">About:</label>
                                    <input {...register("About")} type="text" className="form-control" value={book.about} onChange={(e) => {
                                        setBook({ ...book, about: e.target.value })
                                    }} />
                                    {errors.About?.message && <p className="text-danger">{errors.About.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 p-2">
                                <div className="">
                                    <label className="form-label mb-1 fw-semibold">Publish Year:</label>
                                    <input {...register("PublishYear", { valueAsNumber: true })} type="number" className="form-control" value={book.publishYear} onChange={(e) => {
                                        setBook({ ...book, publishYear: parseInt(e.target.value) })
                                    }} />
                                    {errors.PublishYear?.message && <p className="text-danger">{errors.PublishYear.message}</p>}
                                </div>

                            </div>
                            <div className="col-lg-6 p-2">

                                <div className="">
                                    <label className="form-label mb-1 fw-semibold">Page Count:</label>
                                    <input {...register("PageCount", { valueAsNumber: true })} type="number" className="form-control" value={book.pageCount} onChange={(e) => {
                                        setBook({ ...book, pageCount: parseInt(e.target.value) })
                                    }} />
                                    {errors.PageCount?.message && <p className="text-danger">{errors.PageCount.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 p-2">
                                {!authorLoading && <div className="">
                                    <label className="form-label mb-1 fw-semibold">Author:</label>
                                    <select className="form-select" value={selectedAuthor} onChange={(e) => setSelectedAuthor(parseInt(e.target.value))}>
                                        {author.map(e => {
                                            return <option value={e.id} key={e.id}>{e.name}</option>
                                        })}
                                    </select>
                                </div>}
                            </div>
                            <div className="col-lg-6 p-2">
                                
                                {
                                    !categoryLoading && <div className="">
                                        <label className="form-label mb-1 fw-semibold">Category:</label>
                                        <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
                                            {category.map(e => {
                                                return <option value={e.id} key={e.id}>{e.name}</option>
                                            })}
                                        </select>
                                    </div>}
                                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <button className="btn btn-success" disabled={editLoading}>
                                {editLoading ?
                                    <>
                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                        <span role="status">Loading...</span>
                                    </> :
                                    "Edit"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        }
    </>
}

export default EditBook
