import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/db.database.js";

const Customer = sequelize.define("customer", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Customer

