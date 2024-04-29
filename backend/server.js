const express = require("express")
const dotenv = require("dotenv").config({})
const errorHandler = require("../backend/middleware/ErrorMiddleware")
const userRoute = require("./routes/user/userRoutes")
const ticketRoute = require("./routes/ticket/ticketRoutes")
const colors = require("colors")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

const app = express()

//Database Connection
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Routes

app.use("/api/users", userRoute)
app.use("/api/tickets", ticketRoute)


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Herzlich Wilkommen to Support Ticket system API."
    })
})

//ErrorHandlers
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The server started on port ${PORT}`)
})