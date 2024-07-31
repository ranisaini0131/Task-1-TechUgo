import express from "express"
import sequelize from "./db.js"
import Customer from "./models/customer.js"
import Order from "./models/Order.js"
const app = express()
const port = 8000





//Association

Customer.hasMany(Order)

//database sync
sequelize
    .sync({ force: true })
    .then((result) => {
        return Customer.create({ name: "Chandler Bing", email: "chandler234@getMaxListeners.com" })
    })
    .then(customer => console.log("customer", customer))
    .catch((err) => console.log(err))





app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})