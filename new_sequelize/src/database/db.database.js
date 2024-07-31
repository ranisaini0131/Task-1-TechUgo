import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
    "techugo_sequelize",
    "root",
    "", {
    host: "localhost",
    dialect: "mysql",
})





export default sequelize

