import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Backbutton from "../components/Backbutton"

const NewTicket = () => {
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState("iPhone")
    const [description, setDescription] = useState("")


    //initlization
    const dispatch = useDispatch()
    const navigate = useNavigate()


    //Side Effect of ticket creation
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate("/tickets")
        }
        dispatch(reset())

    }, [navigate, dispatch, isError, isSuccess, message])

    const onSubmit = (e) => {
        e.preventDefault()
        const ticketData = {
            product,
            description
        }
        dispatch(createTicket(ticketData))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <Backbutton url={"/"} />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className='form-control'
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="email"
                        className='form-control'
                        value={email}
                        disabled
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            name="product"
                            id="product"

                        >
                            <option value={"iPhone"}>iPhone</option>
                            <option value={"iMac"}>iMac</option>
                            <option value={"Macbook Pro"}>Macbook Pro</option>
                            <option value={"Airpod"}>Airpod</option>
                            <option value={"iPad"}>iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of Issue</label>
                        <textarea
                            id='description'
                            className='form-control'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description of Issue'
                        >

                        </textarea>
                    </div>

                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default NewTicket