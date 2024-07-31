import express from "express"
import settings from "./db.js"
import bodyParser from "body-parser"
import mysql from "mysql"
import queryBuilder from "node-querybuilder"

import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})


const app = express()
const port = 8080;
app.use(bodyParser.json())

//database connection

const connection = mysql.createConnection(settings);
connection.connect((err) => {
    if (err) throw err;
    console.log('Database is connected successfully!');
});

export const qb = new queryBuilder(settings, 'mysql', 'single');


//import api
import workerRoute from "./workrerRoutes.js"
import bonusRoute from "./bonusWorker.js"


app.use("/worker", workerRoute)
app.use("/bonus", bonusRoute)







app.listen(port, (res, req) => {
    console.log(`Server is running on port ${port} `)
})