const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserGoals = require('../models/UserGoals');


//GET all goals for current user
router.get('/currentUser', async (req,res) => {
    // Todo: create a require login middle ware
    //console.log(req.user.dataValues.id);
    const goals = await UserGoals.findAll(
        { where: {userId: req.user.dataValues.id}, 
          order: [
            ['goalId','DESC'],
          ] 
        }
    )
    res.send(goals);
});

//GET all goals for a specific user (based on USER ID)
//ORDERED BY PRIORITY
router.get('/:user_id', async (req,res,next) => {
    const {user_id} = req.params;
    
    UserGoals.findAll({
        where: {
            userId: [user_id]
        },
        order: [
            ['priority','ASC'],
        ]
    })
    .then(
        goalRes => res.send(goalRes)
    )
    .catch(next)  
});



//GET a specific goal (based on GOAL ID)
router.get('/goalById/:goalId', async (req,res,next) => {
    const {goalId} = req.params;

    try {
        //if user goal exists
        const userGoal = await UserGoals.findByPk(goalId);

        //send back the user goal as a response
        res.status(200).json(userGoal);
    }
    catch(err) {
        next(err);
    }
})

//POST to create a new user goal (based on USER_ID)
router.post('/add', (req,res) => {

    let {userId, amountNeeded, description, reachByDate, progress, priority, title} = req.body;


    //insert into table
    UserGoals.create({
        userId, amountNeeded, description, reachByDate, progress, priority, title
    }) 
    .then(userGoal => res.send(userGoal))
    .catch(err => console.log(err));
})

//PUT to update a user's goal
router.put("/edit/:goalId",async(req,res,next) => {
    const {goalId} = req.params;

    let {userId, amountNeeded, description, reachByDate, progress, priority, title} = req.body;

    const updatedObj = {
        amountNeeded: amountNeeded,
        description: description,
        reachByDate: reachByDate,
        progress: progress,
        priority: priority,
        title: title
    };

    try 
    {
        //finds a user goal with matching ((GOAL ID)) from the database
        const userGoal = await UserGoals.findByPk(goalId);

        //will either show a valid goal object or an error
        console.log(updatedObj);

        //modify the goal object with new form data
        await userGoal.set(updatedObj);

        //save the new goal object to the db
        const updatedUserGoal = await userGoal.save();
        console.log(updatedUserGoal);
        res.status(201).send(updatedUserGoal);
    } catch(err) {
        next(err);
    }
})

//DELETE to remove a user's goal (BASED ON GOAL ID)
router.delete('/remove/:goalId', (req,res,next) => {
    UserGoals.destroy({
        where: {
            goalId: req.params.goalId
        }
    })
    .then(res.sendStatus(200))
    .catch(next)
})



module.exports = router;
