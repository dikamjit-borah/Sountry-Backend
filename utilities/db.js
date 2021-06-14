const Pool = require('pg').Pool;

const pool = new Pool({
    user: "soundtryuser",
    password: "password",
    database: "soundtrydb", 
    host: "18.116.8.19",
});

module.exports = pool;