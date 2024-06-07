import { Router } from "express"
import { deleteUser, forgetPassword, getAllUser, loginUser, registerUser, updateUser } from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/apiValidation.middlewares.js"
import { verifyJWT } from "../middlewares/verifyUser.middlewares.js"
const router = Router()

router.post("/register", validate, registerUser)
router.post("/login", loginUser)
router.get("/getAllUsers", verifyJWT, getAllUser)
router.patch("/updateUser/:id", verifyJWT, updateUser)
router.delete("/deleteUser/:id", verifyJWT, deleteUser)
router.patch("/forgotPassword", verifyJWT, forgetPassword)










export default router