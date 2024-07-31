import { Router } from "express"
import { qb } from "./server.js"
const router = Router()



router.post("/insertBonus", async (req, res) => {
    try {

        //manually inserting data without postman
        const insertUser = qb.query(`INSERT INTO bonus (bonus_id, worker_ref_id, bonus_amount)
                                             VALUES (3, 6, 13500),
                                             (4, 7, 15000),
                                             (5, 3, 12000),
                                             (6, 4, 10000)`)


        console.log(insertUser, "ee")

        res.status(200).json({
            "message": "data inserted successfully",
            "data": insertUser
        })

    } catch (error) {
        console.log("Error:", error)
    }
})


router.get("/bonusAmount", async (req, res) => {
    try {

        const bonus = await qb.query(`SELECT w.worker_id, w.name, b.bonus_amount
                                      FROM workers AS w
                                      LEFT JOIN bonus AS b
                                      ON w.worker_id=b.worker_ref_id;`) //gives all 

        //   SELECT w.worker_id, w.name, b.bonus_amount
        //   FROM workers AS w
        //   INNER JOIN bonus AS b
        //   ON w.worker_id=b.worker_ref_id; gives only bonus amount data


        res.status(200).json({
            "message": "bonus amount",
            "data": bonus
        })


    } catch (error) {
        console.log("error:", error)
    }
})



router.get("/age", async (req, res) => {
    try {

        const age = await qb.query(`SELECT w.age, w.salary, b.bonus_amount
                              FROM workers AS w
                              RIGHT JOIN bonus AS b
                              ON w.worker_id = b.worker_ref_id`)

        res.status(200).json({
            "data": age
        })



    } catch (error) {
        console.log("error:", error)
    }
})



export default router


//orker= worker_id,name, //1, rani
//department table= dep_id, refrence_id, department_name    //1, 1, developer
//2,1,manager
//3,1,HR
