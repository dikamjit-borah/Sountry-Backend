const connection_services = require("../services/connection_services");
const user_services = require("../services/user_services");

const ErrorGenerator = require("../utilities/ErrorGenerator");

exports.send_request = async(req, res) => {

let connect_with_id = req.query["connect_with_id"]
    let request_by_id = req.query["request_by_id"]

    let insert = await connection_services.insert_into_connections(connect_with_id, request_by_id, res);

    console.log("Sending request to user", request_by_id);
    
    if(insert)
        res.json({status:200, message:"Connection request sent"})
}

exports.update_request = async(req, res) => {
    let connect_with_id = req.query["connect_with_id"]
    let request_by_id = req.query["request_by_id"]
    let is_connected = req.query["is_connected"]

    let insert = await connection_services.update_connection(connect_with_id, request_by_id, is_connected, res);

    if(insert)
        res.json({status:200, message:"Connection updated"})
}


exports.get_notifications = async(req, res) => {
    let user_id = req.query["user_id"]
   
    console.log("Fetching notifications for user ", user_id );

    let notifications = await connection_services.get_notifications_service(user_id, res);
    
    res.send(notifications)
}



exports.get_connections = async(req, res) => {
    let user_id = req.query["user_id"]
   
    console.log("Fetching connections for user ", user_id );

    let connections = await connection_services.get_connections_service(user_id, res);
    
    res.send(connections)
}


exports.check_connection = async(req, res) => {
    let connect_with_id = req.query["connect_with_id"]
    let request_by_id = req.query["request_by_id"]
   
    console.log(`Checking if ${request_by_id} is connected with me ${connect_with_id}`);

    let is_connected = await connection_services.check_connection_service(connect_with_id, request_by_id, res);
    
    let len = is_connected.length
    if(len == 0)
        res.json({status:200, data:2})
    else
        res.json({status:200, data:is_connected[0]["is_connected"]})
    

   
}


