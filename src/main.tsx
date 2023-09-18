import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.tsx'
import App from './App.tsx'
import Login from './components/Login.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import Register from './components/Register.tsx'
import BookDetails from './components/Book/BookDetails.tsx'
import DashboardHome from './components/Dashboard/DashboardHome.tsx'
import AddBook from './components/Dashboard/AddBook.tsx'
import EditBook from "./components/Dashboard/EditBook.tsx"
import Books from './components/Dashboard/Books.tsx'
import AddAuthor from './components/Dashboard/AddAuthor.tsx'
import AddCategory from './components/Dashboard/AddCategory.tsx'
import Cart from './components/Cart/Cart.tsx'
import Protected from './Protected.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index path='/' element={<App />}></Route>
      <Route path='/Login' element={<Login />}></Route>
      <Route path='/Register' element={<Register />}></Route>

      <Route path='dashboard/*' element={<Protected>
        <DashboardHome />
      </Protected>}>
        <Route index element={<Books />}></Route>
        <Route path='add' element={<AddBook />}></Route>
        <Route path='edit/:bookid' element={<EditBook />}></Route>
        <Route path='author' element={<AddAuthor />}></Route>
        <Route path='category' element={<AddCategory />}></Route>
      </Route>

      <Route path='book/details/:bookid' element={<BookDetails />}>
      </Route>
      <Route path='/Cart' element={<Cart />}>
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
