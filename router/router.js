const express = require("express");
const { getUser } = require("../controller/users");
const router = express.Router();
router.get("/users", getUser);
module.exports = router;
