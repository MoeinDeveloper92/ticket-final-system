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




//@desc     get user tickets
//@route    GET /api/tickets/:id
//@access   Private
const getTicket = asyncHandler(async (req, res) => {
    //get user using the id in the jwt
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found")
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    res.status(200).json(ticket)

})


//@desc     delete user ticket
//@route    DELETE /api/tickets/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res) => {
    //get user using the id in the jwt
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found")
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Ticket deleted!"
    })
})


//@desc     Update user ticket
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res) => {
    //get user using the id in the jwt
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found")
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedTicket)
})



module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}