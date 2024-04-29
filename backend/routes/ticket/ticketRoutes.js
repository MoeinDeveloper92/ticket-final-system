const express = require("express")
const router = express.Router()
const protect = require("../../middleware/authMiddleware")
const {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket } =
    require("../../controllers/ticket/ticketController")

//in order to get your tickets you must be authenticated
router.route("/")
    .get(protect, getTickets)
    .post(protect, createTicket)

router.route("/:id")
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)



module.exports = router
