import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String,

},
    {

        timestamps: true
    }
)



export const Auth = mongoose.model("Auth", authSchema)


