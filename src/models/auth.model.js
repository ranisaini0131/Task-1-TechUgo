import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String,
    otp: {
        type: Number
    },

    otpExpire: Date,

    avatar: {
        type: String,
    },

    coverImage: {
        type: String,
    },

},
    {

        timestamps: true
    }
)

authSchema.method.otpExpire = Date.now() + 2 * 60 * 1000; //2 min expiration time



export const Auth = mongoose.model("Auth", authSchema)


