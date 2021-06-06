const express = require("express");
const login_router = express.Router();
const login_controller = require("../controllers/login_controller");

//login_router.post("/login", login_controller.authenticate_user);
login_router.post("/signup", login_controller.create_new_user);

module.exports = login_router