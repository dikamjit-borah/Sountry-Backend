const express = require("express");
const user_router = express.Router();
const user_controller = require("../controllers/user_controller");

user_router.post("/upload", user_controller.upload_video);
user_router.post("/videos", user_controller.get_videos);
user_router.get("/video", user_controller.get_video_genres);
user_router.get("/:id", user_controller.get_user_details);



module.exports = user_router