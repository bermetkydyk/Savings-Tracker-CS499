const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserIncome = require('../models/UserIncome');


//GET a specific income (based on income ID)
router.get('/incomeById/:incomeId', async (req,res,next) => {
    const {incomeId} = req.params;

    try {
        //if user income exists
        const userIncome = await UserIncome.findByPk(incomeId);

        //send back the user income back as a response
        res.status(200).json(userIncome);
    }
    catch(err) {
        next(err);
    }
})

//GET all expenses for current user
router.get('/currentUser', async (req,res) => {
    // Todo: create a require login middle ware
    //console.log(req.user.dataValues.id);
    const incomes = await UserIncome.findAll(
        { where: {userId: req.user.dataValues.id}, 
          order: [
            ['incomeId','DESC'],
          ] 
        }
    )
    res.send(incomes);
});

//GET all incomes for the current month
router.get('/currentUser/currentMonth', async (req,res, next) => {
    let d = new Date();
    let currentMonth = d.getMonth();
    let userId = req.user.dataValues.id;
    
    UserIncome.findAll({
        where: {
            userId: userId,
            incomeMonth: [currentMonth]
        },
        order: [
            ['incomeId','DESC'],
        ]
    })
    .then(
        monthIncomes => res.send(monthIncomes)
    )
    .catch(next)
});


//GET all income for a particular user
router.get('/:user_id', async (req,res,next) => {
    const {user_id} = req.params;
    
    UserIncome.findAll({
        where: {
            userId: [user_id]
        },
        //highest MONTHLY income go first
        order: [
            ['incomeMonthly','DESC'],
        ]
    })
    .then(
        incomeRes => res.send(incomeRes)
    )
    .catch(next)  
})

//POST to create a new user income (based on USER_ID)
router.post('/add', (req,res) => {

    let {userId, incomeMonthly, incomeType, description, realAmount, realFrequency, incomeMonth, incomeYear} = req.body;


    //insert into table
    UserIncome.create({
        userId, incomeMonthly, incomeType, description, realAmount, realFrequency, incomeMonth, incomeYear
    }) 
    .then(userIncome => res.send(userIncome))
    .catch(err => console.log(err));
})

//POST to create a new user income (based on USER_ID)
router.post('/currentUser/add', (req,res) => {
    console.log(req.user);
    let userId = req.user.id;
    let {Amount, Description, Month, Type, Year,} = req.body;


    //insert into table
    UserIncome.create({
        userId, 
        incomeType: Type,
        description: Description,
        realAmount: Amount,
        incomeMonth: Month,
        incomeYear: Year
    }) 
    .then(userIncome => res.send(userIncome))
    .catch(err => console.log(err));
})

//TEST API - DELETE LATER!
router.get('/currentUser/add', (req,res) => {
    console.log(req.user.id);
    
})

//PUT to edit income information (must have income id)
router.put("/edit/:incomeId",async(req,res,next) => {
    const {incomeId} = req.params;

    let {userId, incomeMonthly, incomeType, description, realAmount, realFrequency} = req.body;

    const updatedObj = {
        userId: userId,
        incomeMonthly: incomeMonthly,
        incomeType: incomeType,
        description:description,
        realAmount: realAmount,
        realFrequency: realFrequency
    };

    try 
    {
        //finds a user income with matching ((income ID)) from the database
        const userIncome = await UserIncome.findByPk(incomeId);

        console.log(updatedObj);

        //modify the goal object with new form data
        await userIncome.set(updatedObj);

        //save the new goal object to the db
        const updatedUserIncome = await userIncome.save();
        console.log(updatedUserIncome);
        res.status(201).send(updatedUserIncome);
    } catch(err) {
        next(err);
    }
})



//DELETE request to remove an income (must have the income id)
router.delete('/remove/:incomeId', (req,res,next) => {
    UserIncome.destroy({
        where: {
            incomeId: req.params.incomeId
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})





module.exports = router;