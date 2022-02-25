'use strict'

const express = require("express")

const app = express()
app.use(express.json())


const db = require('./db')
db.connect(error => {
    if (error) throw error
    console.log("mysql connected")
})

//endpoint
app.get("/", (req, res) => {
    res.send({
        message: "Berhasil menjalankan get",
        data: {
            description: "berhasil menampilkan data"
        }
    })
})

const paketRouter = require('./paket/paket.route');
const pelangganRouter = require('./pelanggan/pelanggan.route');
app.use("/api/paket", paketRouter);
app.use("/api/pelanggan", pelangganRouter);

const port = 8080;
app.listen(port, () => console.log(`Port running on ${port}`))