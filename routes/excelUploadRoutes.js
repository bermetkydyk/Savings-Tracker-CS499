const express = require("express");
const router = express.Router();
const excelController = require("./excelController");
const upload = require("../middlewares/upload");

router.post("/upload", upload.single("file"), excelController.upload);
router.get("/allIncome", excelController.getIncome);

module.exports = router