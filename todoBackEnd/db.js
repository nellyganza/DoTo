const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Elysee@123",
    host: "localhost",
    port: 5432,
    database: "learnreact"
});

module.exports = pool;