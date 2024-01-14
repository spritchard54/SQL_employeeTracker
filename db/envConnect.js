require("dotenv").config();
const mysql = require('mysql2/promise')

const createConnection = async () => {
    // returns a db variable that we can use
  return await mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });
};
// startConnection is async so we must wait for it to connect
module.exports = createConnection;