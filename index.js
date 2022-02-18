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

app.use("/penduduk", require('./routes/penduduk.route'))

const port = 8000;
app.listen(port, () => console.log(`Port running on ${port}`))