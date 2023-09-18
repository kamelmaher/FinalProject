import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const DashboardHome = () => {
    const [active , setActive] = useState(0)
    
    return (
        <div className='mt-4'>
            <ul className=' list-unstyled d-flex flex-wrap gap-3 justify-content-center dashboard-links'>
                <li>
                    <NavLink  to={"/dashboard/"} className={({ isActive }) => {
                        return `${isActive && "active"} ${active == 0 && "active"}`
                    }}>all Books</NavLink>
                </li>
                <li>
                    <NavLink  to={"/dashboard/add"} onClick={()=> {
                        setActive(1)
                    }} className={({ isActive }) => {
                        return `${isActive && "active"}`
                    }}>Add Book</NavLink>
                </li>
                <li>
                    <NavLink  to={"/dashboard/author"} onClick={()=> {
                        setActive(1)
                    }} className={({ isActive }) => {
                        return `${isActive && "active"}`
                    }}>Add Author</NavLink>
                </li>
                <li>
                    <NavLink  to={"/dashboard/category"} onClick={()=> {
                        setActive(1)
                    }} className={({ isActive }) => {
                        return `${isActive && "active"}`
                    }}>Add Category</NavLink>
                </li>
            </ul>
            <div className='mt-2 p-4'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardHome