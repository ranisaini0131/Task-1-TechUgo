//configuation for sending email from gmail
import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
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






