const express = require('express');
const accountRouter = require("./user");

const router = express.Router();

router.use("/user", accountRouter);

module.exports = router;