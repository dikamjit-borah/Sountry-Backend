const express = require("express");
const connection_router = express.Router();
const connection_controller = require("../controllers/connection_controller");


connection_router.post("/", connection_controller.send_request);
connection_router.put("/update", connection_controller.update_request);

//connection_router.get("/my_connections", connection_controller.get_connections);
// connection_router.get("/my_notifications", connection_controller.get_notifications);


module.exports = connection_router