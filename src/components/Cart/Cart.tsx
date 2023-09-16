import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { removeCartItem } from "../../store/CartSlice"

const Cart = () => {
    const cartItems = useAppSelector(state => state.items);
    const dispatch = useAppDispatch()
    return (
        <div className="row pt-5 m-0 p-3 justify-content-center align-items-center">
            <div className="col-md-6">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>
                                delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((e, index) => {
                            return <tr key={e.id}>
                                <td >{index + 1}</td>
                                <td >{e.name}</td>
                                <td >{e.author.name}</td>
                                <td className="fw-semibold">${e.price}</td>
                                <td><button className="btn btn-outline-danger" onClick={()=> {
                                    dispatch(removeCartItem(e.id))
                                    toast.success("Book Removed Successfully!")
                                }}>remove</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart
