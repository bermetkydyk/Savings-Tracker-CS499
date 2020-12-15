//Model for user income

const Sequelize = require('sequelize');
const db = require('../config/database');


const UserIncome = db.define('user_income',{
    incomeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    incomeMonthly: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        allowEmpty: true,
    },

    incomeType: {
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
    incomeMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowEmpty: false,
    },
    incomeYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowEmpty: false,
    },
}, 
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = UserIncome;