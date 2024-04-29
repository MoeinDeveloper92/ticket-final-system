const asyncHandler = require("express-async-handler")
const User = require("../../models/userModle")
const generateToken = require("../../utils/generateToken")


//@desc     register a new User
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    //Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please include all fields!")
    }

    //userExist Already
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("Uset Already Exist")
    }

    const user = await User.create({
        name,
        email,
        password,

    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error("Problem during Registration")
    }

})


//@desc     login a new user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please include all fields!")
    }
    //use existence
    const userExists = await User.findOne({ email })
    if (!userExists) {
        res.status(400)
        throw new Error("User not Found!")
    }

    if (userExists && (await userExists.passwordMatch(password))) {
        res.status(200)
            .json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                token: generateToken(userExists._id)
            })
    } else {
        res.status(401)
        throw new Error("Invalid Email Or Password")
    }

})


//@desc     Get a single user
//@route    GET /api/users/me
//@access   Private/ need a token
const getMe = asyncHandler(async (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}