'use strict'

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laundry",
    multipleStatements: true,
})

module.exports = db;