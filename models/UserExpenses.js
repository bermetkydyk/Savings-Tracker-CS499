//Model for user expenses

const Sequelize = require('sequelize');
const db = require('../config/database');


const UserExpenses = db.define('user_expenses',{
    expenseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    expenseMonthly: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        allowEmpty: true,
    },

    expenseType: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },

    realAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },

    realFrequency: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },

    expenseMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowEmpty: false,
    },

    expenseYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowEmpty: false,
    }

}, 
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = UserExpenses;
