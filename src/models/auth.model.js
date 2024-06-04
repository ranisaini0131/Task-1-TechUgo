import mongoose from "mongoose";
import Joi from "joi";


// const authSchema = new mongoose.Schema({

//     const joiSchema Joi.object({

//     })
// },
//     {

//         timestamps: true
//     }

// )

const schema = Joi.object({
    username: Joi.string().required(true, 'Please provide name').lowercase().trim(),

    email: Joi.string().required([true, 'Please provide name']).lowercase().trim(),

    password: Joi.string().required(true, 'Please provide name')

})





export const Auth = mongoose.model("Auth", schema)


