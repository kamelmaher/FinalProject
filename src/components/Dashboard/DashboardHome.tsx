import { NavLink, Outlet } from 'react-router-dom'

const DashboardHome = () => {

    return (
        <div className='mt-3'>
            <ul className='list-unstyled d-flex gap-3 justify-content-center'>
                <li>
                    <NavLink to={"/dashboard"} className={({ isActive }) => {
                        return `${isActive && "text-danger fw-bold"}`
                    }}>all Books</NavLink>
                </li>
                <li>
                    <NavLink to={"/dashboard/books/add"} className={({ isActive }) => {
                        return `${isActive && "text-danger fw-bold"}`
                    }}>Add Book</NavLink>
                </li>
                <li>
                    <NavLink to={"/dashboard/books/author"} className={({ isActive }) => {
                        return `${isActive && "text-danger fw-bold"}`
                    }}>Add Author</NavLink>
                </li>
                <li>
                    <NavLink to={"/dashboard/books/category"} className={({ isActive }) => {
                        return `${isActive && "text-danger fw-bold"}`
                    }}>Add Category</NavLink>
                </li>
            </ul>
            <div className='mt-4 p-4'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardHome