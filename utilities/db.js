const Pool = require('pg').Pool;

const pool = new Pool({
    user: "soundtryuser",
    password: "password",
    database: "soundtrydb", 
    host: "3.135.192.47",
});

module.exports = pool;