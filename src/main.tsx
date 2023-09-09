import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.tsx'
import App from './App.tsx'
import Login from './components/Login.tsx'
import Protected from './Protected.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import Register from './components/Register.tsx'
import BookDetails from './components/Book/BookDetails.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index path='/' element={<App />}></Route>
      <Route index path='/Login' element={<Login />}></Route>
      <Route index path='/Register' element={<Register />}></Route>
      <Route index path='/dashboard' element={<Protected>
        <Outlet />
      </Protected>}></Route>
      <Route path='book/details/:bookid' element={<BookDetails />}>
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
)
