const pool = require("../utilities/db");

const ErrorGenerator = require("../utilities/ErrorGenerator");
exports.insert_into_connections = async(connect_with_id, request_by_id, res) => {

    
    let connection_id = new Date().valueOf(); 
    const query1 = `INSERT INTO connections(connection_id, user_id_1, user_id_2, is_connected) 
        VALUES ('${connection_id}', '${connect_with_id}', '${request_by_id}', '0')
    `
    try {
        await pool.query(query1);
    } catch (error) {
        ErrorGenerator.generateError(error, res);
    }

    return true;

}


exports.update_connection = async(connect_with_id, request_by_id, is_connected, res) => {

    
    let connection_id = new Date().valueOf(); 
    let query1;
    if(is_connected==1)
    {

        query1 = `UPDATE connections
        SET is_connected = 1
        WHERE user_id_1 = '${connect_with_id}' and user_id_2 = '${request_by_id}';
        INSERT INTO connections(connection_id, user_id_1, user_id_2, is_connected) 
        VALUES ('${connection_id}', '${request_by_id}', '${connect_with_id}', '1')
        `
        console.log("Adding as connection");
    }
    else if(is_connected==0){

        query1 = `DELETE FROM connections
        WHERE user_id_1 = '${connect_with_id}' and user_id_2 = '${request_by_id}';`
        console.log("Deleting request");
    }
    
    try {
        await pool.query(query1);
    } catch (error) {
        ErrorGenerator.generateError(error, res);
    }

    return true;

}


exports.get_notifications_service = async(user_id, res) => {
    let notifications;
    const query1 = `select * from user_profiles where up_user_id in (SELECT user_id_2 FROM connections WHERE user_id_1 = '${user_id}' and is_connected = '0')`
    try {
        notifications =  await pool.query(query1);
    } catch (error) {
        ErrorGenerator.generateError(error, res);
    }
    return notifications.rows
}