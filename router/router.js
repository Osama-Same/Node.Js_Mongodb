const express = require("express");
const {
  getUser,
  createUser,
  findUser,
  updateUser,
  deleteUser,
  login
} = require("../controller/users");
const { upload } = require("../connection/upload");

const router = express.Router();
router.get("/users", getUser);
router.get("/users/:_id", findUser);
router.put("/users/:id", upload.single("image"), updateUser);
router.post("/users", upload.single("image"), createUser);
router.delete("/users/:id", deleteUser);
router.post("/login", login);
module.exports = router;
