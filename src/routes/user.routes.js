import { Router } from "express"
import { deleteUser, excelImportExport, forgetPassword, getAllUser, htmlToPdf, loginUser, registerUser, updateUser } from "../controllers/auth.controllers.js"
import { uploads } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/verifyUser.middlewares.js"
const router = Router()

router.post("/register",

    uploads.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),

    registerUser)
router.post("/login", loginUser)
router.get("/getAllUsers", verifyJWT, getAllUser)
router.patch("/updateUser/:id", verifyJWT, updateUser)
router.delete("/deleteUser/:id", verifyJWT, deleteUser)
router.patch("/forgotPassword", verifyJWT, forgetPassword)
router.get("/excelData", uploads.single("file"), excelImportExport)
router.get("/htmlToPdf", htmlToPdf)
0









export default router