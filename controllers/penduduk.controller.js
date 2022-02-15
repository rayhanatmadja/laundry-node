'use strict'

const req = require("express/lib/request")
const res = require("express/lib/response")
const db = require("../db")

module.exports = {
    index: (req, res) => {
        const sql = "SELECT * FROM data_penduduk"
        db.query(sql, (err, result) => {
            if(err) throw (err)
            res.json({
                message : "Berhasil",
                data : result
            })
        })
    },
    tambah: (req, res) => {
        let data = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        let sql = "INSERT INTO data_penduduk SET ?";
        if (data.alamat && data.nama) {
            db.query(sql, data, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: "Tambah sukses",
                        data
                    })
                }
            })
        }
    },
    hapus: (req, res) => {
        let id = req.body.id;
        let data;
        if (id) {
            let sql = "SELECT * from data_penduduk where id = ?"
            db.query(sql, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    data = result;
                }
            })
        }
        if (id) {
            let sql = "DELETE from data_penduduk where id = ?";
            db.query(sql, id, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: `ID dengan ${id} berhasil dihapus`,
                        data: data[0]
                    })
                }
            })
        }
    },
    ubah: (req, res) => {
        let id = req.body.id;
        let new_dt = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        let old_dt;

        if (id) {
            let sql = "SELECT nama,alamat FROM data_penduduk WHERE id = ?";
            db.query(sql, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    old_dt = result;
                }
            })
        }
        setTimeout(update, 1);

        function update() {
            if (old_dt) {
                let sql = "UPDATE data SET ? WHERE id = ?";
                db.query(sql, [new_dt, id], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.json({
                            message: `Sukses update dengan id = ${id}`,
                            old_data: old_dt[0],
                            new_data: new_dt
                        })
                    }
                })
            }
        }
    }
}