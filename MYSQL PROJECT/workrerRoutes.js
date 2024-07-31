import { Router } from "express"
import { qb } from "./server.js"
const router = Router()

//get apis
router.get("/getUser", async (req, res) => {
    try {

        // connection.query(`SELECT * FROM workers`, (err, user) => {
        console.log(req.query, "userdata")

        const user = await qb.query(`SELECT * FROM workers`)


        res.status(200).json({
            "message": "get user details",
            user
        })
        // })

    } catch (error) {
        console.log("error:", error)
    }
})


//insert user
router.post("/insertUser", async (req, res) => {
    try {

        const worker = req.body.worker


        //manually inserting data without postman
        // const insertUser = qb.query(`INSERT INTO workers (worker_id, name, department, salary, age)
        //                                      VALUES (1, "Ashutosh Rana", "Actor", 100000, 56),
        //                                      (2,"Dev Malik", "HR", 240000, 23),
        //                                             (3,"Keshav Jha", "HR", 360000, 18),
        //                                             (4,"Narayan Saini", "Marketing", 560000, 20),
        //                                             (5,"Rani Saini", "Backend Developer", 670000, 45),
        //                                             (6,"Simran Singh", "Devops Developer", 140000, 13),
        //                                             (7,"Satish Sahu","Marketing", 780000, 33),
        //                                             (8,"Ahmed Ali", "HR", 560000, 26),
        //                                             (9,"Reetu Malviye", "Banker", 350000, 27),
        //                                             (10,"Sunil Saini","Avisoery",400000, 35),
        //                                             (11,"Sayyed Ali", "HR", 250000, 22),
        //                                             (12,"Neha Bhaseen", "Singer", 340000, 29),
        //                                             (13,"Manish Saini", "Student", 000000, 13),
        //                                             (14,"Sushmita Rathoud", "SBI PO", 400000, 25),
        //                                             (15,"Vishnu Saini", "Graphic Designer", 240000, 25)
        //                                      `)


        //for single row insertion
        // const insertUser = await qb.query(`INSERT INTO workers (name,department,salary,age) VALUES ('${name}','${department}','${salary}','${age}')`)

        //inserting multiple data
        const data = worker.map(worker => [worker.name, worker.department, worker.salary, worker.age]);
        console.log(data)

        const insertedData = await qb.query('INSERT INTO workers (name,department,salary,age) VALUES ?', [data])



        res.status(200).json({
            "message": "data inserted successfully",
            "data": insertedData
        })

    } catch (error) {
        console.log("Error:", error)
    }
})

//update api
router.patch("/updataData", async (req, res) => {
    try {

        const updatedData = await qb.query(`UPDATE workers
                                            SET salary = 400000
                                            WHERE worker_id = 13;
        `)

        res.status(200).json({
            "message": "updated data successfully",
            "data": updatedData
        })

    } catch (error) {
        console.log("error:", error)
    }

})

//ALTER TABLE

router.post('/column-operation', async (req, res) => {
    try {
        console.log(req.body, "hh")
        const { operation, table, column, newColumn, type, newType } = req.body;
        let sql;

        switch (operation) {
            case 'add':
                sql = `ALTER TABLE ${table} ADD COLUMN ${column} ${type} `;
                break;
            case 'drop':
                sql = `ALTER TABLE ${table} DROP COLUMN ${column} `;
                break;
            case 'modify':
                sql = `ALTER TABLE ${table} MODIFY COLUMN ${column} ${newType} `;
                break;
            case 'change':
                sql = `ALTER TABLE ${table} CHANGE ${column} ${column} ${newType} `;
                break;
            case 'rename':
                sql = `ALTER TABLE ${table} CHANGE ${column} ${newColumn} ${type} `;
                break;
            default:
                return res.status(400).send('Invalid operation');
        }

        const alteredData = await qb.query(sql, (err, result) => {
            if (err) return res.status(500).send('Error executing query');
            res.send('Operation successful');
        });

        res.status(200).json({
            "message": "updated data successfully",
            "data": alteredData

        })
    } catch (error) {
        console.log("error:", error)
    }
});


//delete

router.delete("/deleteData", async (req, res) => {
    try {

        const deleteData = await qb.query(`DELETE FROM workers WHERE worker_id = 22`)
        console.log(deleteData)


        res.status(200).json({
            "message": "delete data successfully",
            "data": deleteData
        })

    } catch (error) {
        console.log("error:", error)
    }

})

//department wise highest Salary
router.get("/highestSalary", async (req, res) => {
    try {


        const highest = await qb.query(`SELECT department,max(salary)
                                        FROM workers
                                        GROUP BY department`)



        res.status(200).json({
            "data": highest
        })


    } catch (error) {
        console.log("error:", error)
    }


})

//NUMBER OF EMPLOYEES IN EACH DEPARTMENT

router.get("/numberEmployees", async (req, res) => {
    try {

        const employees = await qb.query(`SELECT department,COUNT(department)
                                          FROM workers
                                          GROUP BY department
                                          HAVING COUNT(department)>1`)

        res.status(200).json({
            "message": "updated data successfully",
            "data": employees
        })



    } catch (error) {
        console.log("error:", error)
    }
})


//2nd highest salary

router.get("/secondHighestSalary", async (req, res) => {

    try {

        const secondHighest = await qb.query(`SELECT *
                                            FROM workers
                                            WHERE salary < (SELECT MAX(salary) FROM workers) LIMIT  1;`)

        res.status(200).json({
            "message": "2nd highest salary",
            "data": secondHighest
        })

    } catch (error) {
        console.log("error:", error)
    }
})


export default router;