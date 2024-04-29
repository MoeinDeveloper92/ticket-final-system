const express = require("express")
const router = express.Router()
const protect = require("../../middleware/authMiddleware")
const { createTicket, getTickets } = require("../../controllers/ticket/ticketController")

//in order to get your tickets you must be authenticated
router.route("/")
    .get(protect, getTickets)
    .post(protect, createTicket)



module.exports = router
