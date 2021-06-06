const express = require("express");
const user_router = express.Router();
const user_controller = require("../controllers/user_controller");

//user_router.post("/user", user_controller.authenticate_user);
user_router.post("/upload", user_controller.upload_video);

user_router.get("/videos", user_controller.get_videos);


module.exports = user_router