import express from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json({ limit: "160kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))


//import routes
import userRouter from "./routes/user.routes.js"


app.use("/api/v1/users", userRouter)







export { app }