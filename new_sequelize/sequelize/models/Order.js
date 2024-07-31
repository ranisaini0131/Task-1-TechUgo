import { Sequelize } from "sequelize";
import sequelize from "../db.js";

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
})

export default Order;