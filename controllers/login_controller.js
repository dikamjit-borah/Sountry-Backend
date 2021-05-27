const db = require("../models/index");
const login_services = require("../services/login_services");
const ErrorGenerator = require("../utilities/ErrorGenerator");
const jwt = require("jsonwebtoken");

exports.create_new_user = async(req, res)=>{

    console.log("Sign up for ", req.body);

    let user = await login_services.create_new_user_service(req, res);
    res.json(user);
    
}


exports.authenticate_user = async(req, res)=>{

    let user_name = req.body.user_name;
    let password = req.body.password;
    
    console.log("Log in attempted by user ", req.body);

    let db_password = await login_services.authenticate_user_service(user_name, res);


    if(db_password.length == 0)
        res.json({status:404, message:`No user found with username ${user_name}`})
    else if(db_password[0].up_password == password)
    {
        const token = jwt.sign({user_name}, process.env.JWT_SECRET)
        //lolcalstorage
        res.json({status:200, data:{
            user_id: db_password[0].up_user_id,
            token:`${token}`
        }  })
        console.log(user_name, " logged in");

        
    }
    else{
        res.json({status:401, message:"Incorrect credentials" })
    }
      
  
    
}