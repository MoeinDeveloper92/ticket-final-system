import React, { useState } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
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