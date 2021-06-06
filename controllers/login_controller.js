const db = require("../models/index");
const login_services = require("../services/login_services");
const ErrorGenerator = require("../utilities/ErrorGenerator");
const jwt = require("jsonwebtoken");

exports.create_new_user = async(req, res)=>{

    let user = await login_services.create_new_user_service(req, res);
    res.json(user);
    
}