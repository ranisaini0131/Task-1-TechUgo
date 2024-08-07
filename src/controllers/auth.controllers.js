import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pdf from "html-pdf"
import axios from "axios"
import XLSX from 'xlsx';
import connectDb from "../db/index.db.js";
import { Auth } from "../models/auth.model.js"
import { sendMail } from "../utility/nodemailer.utility.js"

const registerUser = async (req, res) => {
    console.log("hello11")

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
        console.log(password, 33)

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)



        //create new user

        const newUser = new Auth({
            username,
            email,
            password: hashedPassword

        })
        await newUser.save()


        if (!newUser) {
            return res.status(500).json({
                status: 'error',
                message: "something went wrong while registering the user"
            })
        }

        //return response
        return res.json({
            status: "success",
            message: "User Registered successfully",
            newUser
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


const updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const updatedUser = await Auth.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )


        return res
            .status(200)
            .json({
                status: "success",
                data: updatedUser
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

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Auth.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedProduct: product
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                message: "product not deleted"
            })
    }
}


// const resetPassword = async (req, res) => {
//     try {
//         const { new_password, password } = req.body;

//         if ()

//             const nUser = await Auth.findOneAndUpdate(
//                 { email },
//                 {
//                     $set: {
//                         password: hashedPassword
//                     }
//                 },
//                 {
//                     new: true
//                 }

//             ).select(
//                 "-password"
//             )

//         return res
//             .status(200)
//             .json({
//                 status: 'success',
//                 message: "Password changed successfully",
//                 nUser
//             })

//     } catch (error) {

//     }

// }

const forgetPassword = async (req, res) => {

    try {
        const { email } = req.body

        if (email) {

            //username, email exists or not
            const existUser = await Auth.findOne({ email })


            if (existUser) {

                //generate OTP
                const generateOTP = () => {
                    return Math.floor(1000 + Math.random() * 9000).toString()
                }
                existUser.otp = generateOTP()
                const userOtp = existUser.otp
                console.log(userOtp)

                //save into user model
                const user = await Auth.findOneAndUpdate({ email }, { $set: { otp: userOtp } }, { new: true })

                console.log(user, "223")

                //config sendMail args
                const subject = "Task-1 OTP"
                const html = `Your One Time Password is ${userOtp}`

                // /this method send email
                const response = await sendMail({
                    to: email,
                    subject,
                    html
                });

                console.log(response, "300")

                return res.status(200).json({
                    status: "success",
                    message: `OTP send Successfully to ${existUser.email}`,

                })

            } else {
                return res.status(422).json({
                    status: "fail",
                    message: "Wrong Email or username",
                    error: error.message
                })
            }


        }
        else {
            return res.status(422).json({
                status: "fail",
                message: "Please provide username or email",
                error: error.message
            })
        }

    } catch (error) {
        console.log("ERROR: ", error)
        Auth.otp = undefined,
            Auth.otpExpire = undefined
    }


}


const htmlToPdf = async (req, res) => {


    async function generatePDFfromURL(url, outputPath) {
        try {
            const response = await axios.get(url);
            const htmlContent = response.data;
            pdf.create(htmlContent).toFile(outputPath, (err, res) => {
                if (err) return console.log(err);
                console.log('PDF generated successfully:', res);
            });


            return res.status(200).json({
                status: "success",
                message: `PDF generated successfully:`,

            })


        } catch (error) {
            console.error('Error fetching URL:', error);
        }
    }

    // Usage
    generatePDFfromURL('https://google.com', 'google.pdf');


}
const excelImportExport = async (req, res) => {

    try {
        const importWorkbook = XLSX.readFile("public/temp/student_profile.ods");

        // Get the first sheet from the workbook
        // const sheetName = importWorkbook.SheetNames[0];
        const importWorksheet = importWorkbook.Sheets["student_profile"];

        // Convert the worksheet to JSON
        const importData = XLSX.utils.sheet_to_json(importWorksheet, { header: 1 });

        console.log("Data imported from Excel:", importData, "381");

        // //insert data to database
        // // const db = .db(dbName);
        // const collection = connectDb.collection(Auth);

        // // Insert the data into the collection
        // const result = await collection.insertMany(importData);
        // console.log(result, "389")


        // /create new user

        const newUser = new Auth([importData])
        await newUser.save()
        console.log(newUser, "saved")

        ////work on 20 data
        //loop on importdata to check entry

        return res.json({
            status: "success",
            message: "data saved to database successfully",
            newUser
        })

    } catch (error) {
        console.log(error)
    }
}


export {
    registerUser,
    loginUser,
    getAllUser,
    updateUser,
    deleteUser,
    forgetPassword,
    htmlToPdf,
    excelImportExport
}




// //export

// // Sample data to be written to Excel
// const data = [
//     ["Name", "Age", "Email"],
//     ["John Doe", 28, "john.doe@example.com"],
//     ["Jane Smith", 34, "jane.smith@example.com"],
//     ["Sam Brown", 22, "sam.brown@example.com"]
// ];

// // Convert the data to a worksheet
// const worksheet = XLSX.utils.aoa_to_sheet(data);

// // Create a new workbook and add the worksheet to it
// const workbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// // Write the workbook to a file
// XLSX.writeFile(workbook, "output.xlsx");

// console.log("Excel file created: output.xlsx");

