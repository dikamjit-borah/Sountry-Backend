const Pool = require('pg').Pool;

const pool = new Pool({
    user: "soundtryuser",
    password: "password",
    database: "soundtrydb", 
    host: "3.142.196.242",
    port: process.env.PORT
});

module.exports = pool;