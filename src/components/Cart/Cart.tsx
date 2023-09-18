import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { removeCartItem } from "../../store/CartSlice"
import { useEffect, useState } from "react";

const Cart = () => {
    const cartItems = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch()
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let x: number = 0;
        cartItems.map(e => x += e.price)
        setTotal(x)
    }, [cartItems])
    return (
        <div className="row pt-5 m-0 p-3 justify-content-center align-items-center">
            <div style={{
                width:"80%",
                overflowX: "auto",
            }}
            >
                <table className="table text-center" style={{
                    minWidth: "600px",
                }}>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((e, index) => {
                            return <tr key={e.id}>
                                <td >{index + 1}</td>
                                <td ><img src={`http://wfatairreact-001-site1.ctempurl.com/api/Images/${e.image}`} alt="" width={"50px"} className="rounded" /></td>
                                <td >{e.name}</td>
                                <td >{e.author.name}</td>
                                <td className="fw-semibold">${e.price}</td>
                                <td><button className="btn btn-outline-danger" onClick={() => {
                                    dispatch(removeCartItem(e.id))
                                    toast.success("Book Removed Successfully!")
                                }}>remove</button></td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="fs-5 fw-semibold">Total: 
                                <span className="text-success"> ${total}</span>
                            </td>
                            <td colSpan={2} className="text-center btn-success">Check Out</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Cart
