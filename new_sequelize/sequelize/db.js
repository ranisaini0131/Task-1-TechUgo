import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "sample1",
    "root",
    "password",
    {
        dialect: "mysql",
        host: "localhost"
    }
)

export default sequelize