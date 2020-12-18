//Model for user goals

const Sequelize = require('sequelize');
const db = require('../config/database');


const UserGoals = db.define('user_goals',{
    goalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    title:{
      type: Sequelize.STRING,
      allowNull: true,
      allowEmpty: true,
    },

    amountNeeded: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        allowEmpty: false,
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true,
        allowEmpty: true,
    },

    reachByDate: {
        type: Sequelize.DATE,
        allowNull: false,
        allowEmpty: false,
    },

    progress: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        allowEmpty: true,
    },

    priority: {
        type: Sequelize.INTEGER,
        allowNull: true,
        allowEmpty: false,
    },

    isComplete:{
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
    },

    savingsTowardsGoal:{
        type: Sequelize.DOUBLE,
        allowNull:true,
        allowEmpty: true
    }

},
//since sequelize adds an S to the end of the table name, freezeTableName takes the name of the table literally
{freezeTableName: true})

module.exports = UserGoals;
