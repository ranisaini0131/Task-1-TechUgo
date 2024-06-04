import { Router } from "express"
import { getAllUser, loginUser, registerUser } from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/apiValidation.middlewares.js"
import { verifyJWT } from "../middlewares/verifyUser.middlewares.js"
const router = Router()

router.post("/register", validate, registerUser)
router.post("/login", loginUser)
router.get("/getAllUsers", verifyJWT, getAllUser)










export default router