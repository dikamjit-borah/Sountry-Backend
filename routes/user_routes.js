const express = require("express");
const user_router = express.Router();
const user_controller = require("../controllers/user_controller");

user_router.post("/upload", user_controller.upload_video);
user_router.post("/videos", user_controller.get_videos);
user_router.get("/forum", user_controller.get_forum_posts);
user_router.get("/video", user_controller.get_video_genres);
user_router.get("/:id", user_controller.get_user_details);

user_router.put("/preferences", user_controller.update_user_preferences);

user_router.post("/add_forum_post", user_controller.add_new_requirement);

module.exports = user_router;
