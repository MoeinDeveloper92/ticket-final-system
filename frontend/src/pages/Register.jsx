import React, { useState } from 'react'
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords do not match!")
        }
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please create an Account!</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <input
                            type="text"
                            className='form-control'
                            value={name}
                            id='name'
                            placeholder='Enter your name'
                            onChange={handleChange}
                            required

                        />
                    </div>
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
                        <input
                            type="password"
                            className='form-control'
                            value={password2}
                            id='password2'
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register