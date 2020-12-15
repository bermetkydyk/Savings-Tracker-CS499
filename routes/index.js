var express = require("express");
var router = express.Router();

// Subrouters;
const userRouter = require("./userRoutes");
const userGoalsRouter = require("./userGoalsRoutes");
const userExpensesRouter = require("./userExpensesRoutes");
const userIncomeRouter = require("./userIncomeRoutes");
// const fileUpload = require("./excelController");

router.use("/users", userRouter);
router.use("/userGoals",userGoalsRouter);
router.use("/userExpenses",userExpensesRouter);
router.use('/userIncomes',userIncomeRouter);
// router.use('/api/file/', fileUpload);


router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

module.exports = router;