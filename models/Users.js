//Model for users
const Sequelize = require('sequelize');
const db = require('../config/database');


const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
    },

    username: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },

    totalBalance: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        allowEmpty: true
    },

    googleId: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },

    fullName: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },
}, 
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = Users;
