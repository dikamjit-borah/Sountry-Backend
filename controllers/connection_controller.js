const connection_services = require("../services/connection_services");
const ErrorGenerator = require("../utilities/ErrorGenerator");

exports.send_request = async(req, res) => {
    let connect_with_id = req.query["connect_with_id"]
    let request_by_id = req.query["request_by_id"]

    let insert = await connection_services.insert_into_connections(connect_with_id, request_by_id, res);

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

