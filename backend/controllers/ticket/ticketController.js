const asyncHandler = require("express-async-handler")
const User = require("../../models/userModle")
const Ticket = require("../../models/ticketModel")

//@desc     get all tickets
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res) => {
    //get user using the id in the jwt
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const tickets = await Ticket.find({ user: req.user._id })

    res.status(200).json({
        count: tickets.length,
        tickets
    })
})


//@desc     Create a new ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error("Please include all fields!")
    }

    //get user using the id in the jwt
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.create({
        user: req.user._id,
        product,
        description,
        status: "new"
    })

    if (ticket) {

        res.status(201).json(ticket)
    } else {
        res.status(400).json({
            message: 'Ticket has not been created!!!'
        })
    }
})



module.exports = {
    getTickets,
    createTicket
}