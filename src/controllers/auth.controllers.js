import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Auth } from "../models/auth.model.js"

const registerUser = async (req, res) => {
    try {

        //get user details from frontend
        const { username, email, password } = req.body

        //validation
        if (!(username || email || password)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }


        //check if user already exists or not
        const existedUser = await Auth.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            return res.status(409).json({
                status: "failed",
                message: "User already exists"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)



        //create new user

        const newUser = new User({
            username,
            email,
            password: hashedPassword

        })
        await newUser.save()


        if (!createdUser) {
            return res.status(500).json({
                status: 'error',
                message: "something went wrong while registering the user"
            })
        }

        //return response
        return res.json({
            status: "success",
            message: "User Registered successfully",
            createdUser
        })
    } catch (error) {
        console.log(error)
    }
}


const loginUser = async (req, res) => {
    //get user entered data
    console.log(req.body)
    try {
        const { username, email, password } = req.body

        //check fields
        if (!(username || email)) {
            return res.status(422).json({
                status: "fail",
                message: "Please provide username or email"
            })
        }

        //check existed user
        const user = await Auth.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "User does not exist"
            })
        }


        //validate passowrd
        const isPasswordValidate = await bcrypt.compare(password, user.password)
        if (!isPasswordValidate) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid user credentials",
                error: error.message
            })
        }


        //generate token
        const token = jwt.sign(
            {
                user: user,
                passowrd: req.body.passowrd
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )


        //response to user
        const loggedInUser = await Auth.findById(user._id).select(
            "-password"
        )


        //return response 
        return res
            .status(200)
            .json({
                status: 'success',
                data: {
                    user: loggedInUser,
                    token: token
                },
                message: "User Login Successfully"
            })

    } catch (error) {
        console.log("Error: ", error.message)
    }
}


const getAllUser = async (req, res) => {
    try {
        const users = await Auth.find()

        return res
            .status(200)
            .json({
                status: "success",
                data: users
            })


    } catch (error) {

        return res
            .status(500)
            .json({
                status: "failed",
                error: error.message
            })
    }
}

export {
    registerUser,
    loginUser,
    getAllUser
}


