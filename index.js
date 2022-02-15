'use strict'

// inisialisasi
const express = require('express');
const { route } = require('express/lib/application');
const req = require('express/lib/request');
const res = require('express/lib/response');

// implementasi
const app = express()
app.use(express.json());

// konek db
const db = require("./db")
db.connect(error => {
    if(error) throw error
    console.log('Mysql Connected')
});

// endpoint
app.get("/", (req,res) => {
    res.send({
        message : "Berhasil menjalankan method GET",
        data : {
            description : "Endpoint ini menampilkan data"
        }
    })
});

// app.post("/tambah", (req,res) => {
//     res.send({
//         message : "Berhasil menambahkan data",
//     })
// });

// app.put("/ubah", (req,res) => {
//     res.send({
//         message : "Berhasil ubah data",
//     })
// });

// app.delete("/hapus", (req,res) => {
//     res.send({
//         message : "Berhasil menghapus data",
//     })
// });

app.use("/penduduk", require('./routes/penduduk.route'));

const port = 8080;
app.listen(port, () => console.log(`App sudah berjalan di port ${port}`));