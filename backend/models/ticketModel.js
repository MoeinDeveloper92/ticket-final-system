const mongoose = require("mongoose")


const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: String,
        required: [true, "this field is reuqird"],
        enum: ["iPhone", "Macbook Pro", "iMac", "iPad", "Airpod"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["new", "open", "closed"],
        default: "new"
    }
}, {
    timestamps: true
})

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket