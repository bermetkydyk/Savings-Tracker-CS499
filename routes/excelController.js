const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserIncome = require('../models/UserIncome');
const UserExpenses = require('../models/UserExpenses');

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
  
      let path =
        __basedir + "/resources/static/assets/uploads/" + req.file.filename;
  
      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();
  
        let userIncomeArr = [];
        let userExpenseArr = [];

        let userId = req.user.dataValues.id;
 
        rows.forEach((row) => {
          if(row[0] == "Income"){
            let incomeObj = {
                userId: userId,
                incomeType: row[1],
                realAmount: row[2],
                description: row[3],
                incomeMonth: row[4]-1,
                incomeYear: row[5],
              };
              userIncomeArr.push(incomeObj);
          }
          if(row[0] == "Expense"){
            let expenseObj = {
              userId: userId,
              expenseType: row[1],
              realAmount: row[2],
              description: row[3],
              expenseMonth: row[4]-1,
              expenseYear: row[5],
              };
              userExpenseArr.push(expenseObj);
          }
            
        });

        UserIncome.bulkCreate(userIncomeArr)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });

        UserExpenses.bulkCreate(userExpenseArr)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });

      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  };
  
  const getIncome = (req, res) => {
    UserIncome.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };
  

  module.exports = {
    upload,
    getIncome,
  };