import React from 'react'
import {
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter
} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Home, Register, Login, NewTicket, PrivateRoute, Tickets, NotFound } from "./pages/index"
import MainLayout from './layout/MainLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new-ticket' element={<PrivateRoute />}>
          <Route path='/new-ticket' element={<NewTicket />} />
        </Route>
        <Route path='/tickets' element={<PrivateRoute />}>
          <Route path='/tickets' element={<Tickets />} />
        </Route>
        <Route path='*' element={<NotFound />} />
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