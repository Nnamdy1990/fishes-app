const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "kelechi1990",
  host: "localhost",
  port: 5432,
  database: "fisheslist",
});

module.exports = pool;
