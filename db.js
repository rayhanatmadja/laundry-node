'use strict'

const msyql = require('mysql');

// koneksi
const db = msyql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penduduk",
    multipleStatements: true
})

module.exports = db;