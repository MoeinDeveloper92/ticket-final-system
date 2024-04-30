import { useState, useEffect } from "react";
import { useSelector } from "react-redux"


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    //get the user from the slice
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        //we want this fucnion to run whenevr the user changes
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [user])

    return { loggedIn, checkingStatus } 
}

