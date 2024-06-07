//configuation for sending email from gmail
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

let transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

console.log(process.env.EMAIL, "15")

//Verify Transporter
transporter.verify((err, success) => {
    if (err) { console.error(err); }
    else {
        console.log('Your config is correct');
    }
})

export const sendMail = async function ({ to, subject, html }) {
    let info = await transporter.sendMail({
        from: '"Task-1" <sainirani1797@gmail.com>', // sender address
        to,
        subject,
        html
    });

    return info;
}






