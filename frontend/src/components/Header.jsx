import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Header = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to={"/"}>

                    Support Desk
                </Link>
            </div>
            <ul>
                {user ? (<>
                    <li onClick={() => onLogout()}>
                        <button className='btn '>
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </li>
                </>) : (
                    <>
                        <li>
                            <Link to={"/login"}>
                                <FaSignInAlt />
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to={"/register"}>
                                <FaUser />
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header