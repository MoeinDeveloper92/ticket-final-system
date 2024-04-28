import React from 'react'
import {
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter
} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Home, Register, Login } from "./pages/index"
import MainLayout from './layout/MainLayout'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </>

  )
)

const App = () => {
  return (
    <div className='container'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>

  )
}

export default App