import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'

 
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (user || isSuccess) {
            toast.success("you logged In")
            navigate("/")
        }

        dispatch(reset())
    }, [user, dispatch, navigate, isError, message])

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please Login To Your Account!</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit} >

                    <div className="form-group">
                        <input
                            type="email"
                            className='form-control'
                            value={email}
                            id='email'
                            placeholder='Enter your Email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            value={password}
                            id='password'
                            placeholder='Enter your Password'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button type='submit' className="btn btn-block">
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login