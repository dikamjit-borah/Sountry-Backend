const config = require("./config/config.json");
const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const pg = require("pg");

const login_routes = require("./routes/login_routes");
const user_routes = require("./routes/user_routes");
const connection_routes = require("./routes/connection_routes");



const app = express();
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: `http://localhost:${port}`,
}; //ip of frontend. or where frontend is hosted.

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", login_routes);
app.use("/api/user",  user_routes);
app.use("/api/connect",  connection_routes);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});