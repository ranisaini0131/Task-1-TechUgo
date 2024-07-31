import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/db.database.js";

const Order = new Sequelize("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Order