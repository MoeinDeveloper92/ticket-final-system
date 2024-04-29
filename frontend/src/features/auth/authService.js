import axios from "axios"

const API_URL = "/api/users"


//register User
const register = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData)
        if (response.data) {
            //Local storgage can only hold string
            localStorage.setItem("user", JSON.stringify(response.data))
            return response.data
        }

    } catch (error) {
        throw error
    }
}

//logit
const logout = async () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    logout
}

export default authService