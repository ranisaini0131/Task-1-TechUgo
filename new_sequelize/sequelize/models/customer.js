import { Sequelize } from "sequelize";
import sequelize from "../db.js";
const Customer = sequelize.define("customer", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

export default Customer