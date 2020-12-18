const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserExpenses = require('../models/UserExpenses');





//GET a specific expense (based on EXPENSE ID)
router.get('/expenseById/:expenseId', async (req,res,next) => {
    const {expenseId} = req.params;

    try {
        //if user expense exists
        const userExpense = await UserExpenses.findByPk(expenseId);

        //send back the user expense back as a response
        res.status(200).json(userExpense);
    }
    catch(err) {
        next(err);
    }
})


//GET all expenses for current user
router.get('/currentUser', async (req,res) => {
    if (!req.user){
        return res.status(401).send({error:'You must log in!'});
    }
    const expenses = await UserExpenses.findAll(
        { where: {userId: req.user.dataValues.id}, 
          order: [
            ['expenseId','DESC'],
          ] 
        }
    )
    res.send(expenses);
});


//GET all expenses for a particular user
router.get('/:userId', async (req,res,next) => {
    const {userId} = req.params;
    
    UserExpenses.findAll({
        where: {
            userId: [userId]
        },
        //highest MONTHLY expenses go first
        order: [
            ['expenseMonthly','DESC'],
        ]
    })
    .then(
        expenseRes => res.send(expenseRes)
    )
    .catch(next)  
})

//GET all expenses for current user
router.get('/currentUser', async (req,res) => {
    // Todo: create a require login middle ware
    console.log('res.data.auth.id');
    // const expenses = await UserExpenses.findAll({ where: {userId: res.data.auth.id} })
    // res.send(expenses);
});

//GET all expenses for the current month
router.get('/currentUser/currentMonth', async (req,res, next) => {
    let d = new Date();
    let currentMonth = d.getMonth();
    let userId = req.user.dataValues.id;
    
    UserExpenses.findAll({
        where: {
            userId: userId,
            expenseMonth: [currentMonth]
        },
        order: [
            ['expenseId','DESC'],
        ]
    })
    .then(
        monthExpenses => res.send(monthExpenses)
    )
    .catch(next)
});



//POST to create a new user expense (based on USER_ID)
router.post('/add', (req,res) => {

    let {expenseMonthly, expenseType, description, realAmount, realFrequency, expenseMonth, expenseYear} = req.body;
    let userId = req.user.dataValues.id;

    //insert into table
    UserExpenses.create({
        userId, expenseMonthly, expenseType, description, realAmount, realFrequency, expenseMonth, expenseYear
    }) 
    .then(userExpense => res.send(userExpense))
    .catch(err => console.log(err));
})

//POST to create a new user expense (based on currently login user)
router.post('/currentUser/add', (req,res) => {
    if (!req.user){
        return res.status(401).send({error:'You must log in!'});
    }
    let userId = req.user.dataValues.id;
    let {amountNeeded} = req.body;

    let d = new Date();
    let currentMonth = d.getMonth();
    let currentYear = d.getFullYear();

    //insert into table
    UserExpenses.create({
        userId,
        expenseType: "other",
        description: "Fullfill goals", 
        realAmount: amountNeeded, 
        expenseMonth: currentMonth, 
        expenseYear: currentYear
    }) 
    .then(userExpense => res.send(userExpense))
    .catch(err => console.log(err));
})

//PUT to edit expense information (must have expense id)
router.put("/edit/:expenseId",async(req,res,next) => {
    const {expenseId} = req.params;

    let {userId, expenseMonthly, expenseType, description, realAmount, realFrequency, expenseMonth, expenseYear} = req.body;

    const updatedObj = {
        userId: userId,
        expenseMonthly: expenseMonthly,
        expenseType: expenseType,
        description: description,
        realAmount: realAmount,
        realFrequency: realFrequency,
        expenseMonth: expenseMonth, 
        expenseYear: expenseYear

    };

    try 
    {
        //finds a user expense with matching ((EXPENSE ID)) from the database
        const userExpense = await UserExpenses.findByPk(expenseId);

        console.log(updatedObj);

        //modify the goal object with new form data
        await userExpense.set(updatedObj);

        //save the new goal object to the db
        const updatedUserExpense = await userExpense.save();
        console.log(updatedUserExpense);
        res.status(201).send(updatedUserExpense);
    } catch(err) {
        next(err);
    }
})

//DELETE request to remove an expense (must have the expense id)
router.delete('/remove/:expenseId', (req,res,next) => {
    UserExpenses.destroy({
        where: {
            expenseId: req.params.expenseId
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})





module.exports = router