import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import z from "zod"
import ApiClicent from "../../services/ApiClicent";
import { author, category } from "../../types/Book";
import UseFetch from "../../services/UseFetch";
import { useEffect, useState } from "react";

const AddBook = () => {
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
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BookFormData>(
        { resolver: zodResolver(schema) }
    )
    const [addLoading, setAddLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [selectedAuthor, setSelectedAuthor] = useState(-1)
    const { Books: category, isLoading: categoryLoading } = UseFetch<category[]>("/Category", [])
    const { Books: author, isLoading: authorLoading } = UseFetch<author[]>("/Author", [])


    useEffect(() => {
        !authorLoading && setSelectedAuthor(author[0].id)
        !categoryLoading && setSelectedCategory(category[0].id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, author]);
    return (<>

        <div className="row justify-content-center">
            <div className="col-md-10 row">
                <form onSubmit={handleSubmit(data => {
                    console.log(selectedAuthor)
                    console.log(selectedCategory)
                    const bookData = new FormData();
                    bookData.append("Name", data.Name)
                    bookData.append("Price", String(data.Price))
                    bookData.append("About", data.About)
                    bookData.append("PublishYear", String(data.PublishYear))
                    bookData.append("PageCount", String(data.PageCount))
                    bookData.append("ImageFile", data.ImageFile[0])
                    bookData.append("PublisherId", 1 + "")
                    bookData.append("AuthorId", String(selectedAuthor))
                    bookData.append("CategoryId", String(selectedCategory))
                    setAddLoading(true)
                    ApiClicent.post(`/Book`, bookData).then(() => {
                        setAddLoading(false)
                        toast.success("Book Added Succefully!")
                        reset()
                    })
                })}>
                    <h3 className="mb-2 text-center">Add Book</h3>

                    <div className="row">
                        <div className=" col-lg-6 p-2">
                            <label className="form-label mb-1 fw-semibold">Name:</label>
                            <input {...register("Name")} type="text" className="form-control" />
                            {errors.Name?.message && <p className="text-danger">{errors.Name.message}</p>}
                        </div>

                        <div className="col-lg-6 p-2">
                            <label className="form-label mb-1 fw-semibold">Image:</label>
                            <input type="file" {...register("ImageFile")} className="form-control" />
                            {errors.ImageFile?.message && <p className="text-danger mt-2">{errors.ImageFile.message}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 p-2">
                            <div className="">
                                <label className="form-label mb-1 fw-semibold">price:</label>
                                <input {...register("Price", { valueAsNumber: true })} type="number" className="form-control" />
                                {errors.Price?.message && <p className="text-danger">{errors.Price.message}</p>}
                            </div>

                        </div>
                        <div className="col-lg-6 p-2">

                            <div >
                                <label className="form-label mb-1 fw-semibold">About:</label>
                                <input {...register("About")} type="text" className="form-control" />
                                {errors.About?.message && <p className="text-danger">{errors.About.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 p-2">
                            <div className="">
                                <label className="form-label mb-1 fw-semibold">Publish Year:</label>
                                <input {...register("PublishYear", { valueAsNumber: true })} type="number" className="form-control" />
                                {errors.PublishYear?.message && <p className="text-danger">{errors.PublishYear.message}</p>}
                            </div>

                        </div>
                        <div className="col-lg-6 p-2">
                            <div className="">
                                <label className="form-label mb-1 fw-semibold">Page Count:</label>
                                <input {...register("PageCount", { valueAsNumber: true })} type="number" className="form-control" />
                                {errors.PageCount?.message && <p className="text-danger">{errors.PageCount.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-6 p-2">
                            <div className="">
                                <label className="form-label mb-1 fw-semibold">Author:</label>
                                <select className="form-select" value={selectedAuthor} onChange={(e) => setSelectedAuthor(parseInt(e.target.value))}>
                                    {author.map(e => {
                                        return <option value={e.id} key={e.id}>{e.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 p-2">
                            <div className="">
                                <label className="form-label mb-1 fw-semibold">Category:</label>
                                <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
                                    {category.map(e => {
                                        return <option value={e.id} key={e.id}>{e.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-success" disabled={addLoading}>
                            {addLoading ?
                                <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </> :
                                "Add"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default AddBook