import axios from "axios"

const API_URL = "/api/tickets/"


//create New Ticket
const createTicket = async (tikcetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, tikcetData, config)

    return response.data
}


// get user tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}
const ticketService = {
    createTicket,
    getTickets
}

export default ticketService