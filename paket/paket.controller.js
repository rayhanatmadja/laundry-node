'use strict'

const db = require('../db')
var bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    index: (req, res) => {
        let sql = "select * from paket"
        db.query(sql, (err, result) => {
            if (err) throw (err)
            res.json({
                message: "Success",
                data: result
            })
        })
    },
    add: (req, res) => {
        let data = {
            jenis: req.body.jenis,
            harga: req.body.harga
        }
        let sql = "insert into paket SET ?";
        if (data.harga && data.jenis) {
            db.query(sql, data, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: "Berhasil menambah paket",
                        data
                    })
                }
            })
        }
    },
    delete: (req, res) => {
        let id = req.body.id;
        let data;
        if (id) {
            let sql = "SELECT * from paket where id = ?"
            db.query(sql, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    data = result;
                }
            })
        }
        if (id) {
            let sql = "DELETE from paket where id = ?";
            db.query(sql, id, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: `Paket dengan id ${id} berhasil dihapus.`,
                        data: data[0]
                    })
                }
            })
        }
    },
    update: (req, res) => {
        const id = req.body.id;
        let new_dt = {
            jenis: req.body.jenis,
            harga: req.body.harga
        }
        db.query(`update paket set ? where id = '${id}'`, new_dt, (err, result) => {
            let response = null;
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil update data",
                    data: result
                })
            }
        })
    },
    // db.query("INSERT INTO akun SET ?", dataAkun, (err, result) => {
    //     if(err) throw err
    //     else{
    //         res.send(`Selamat, berhasil register atas jenis ${dataAkun.jenis}, dengan email ${dataAkun.email}`),
    //         console.log("Berhasil register", result)
    //     }
    // })

    // const sql = "SELECT * FROM akun WHERE email=? AND password=?";
    // if(email && password){
    //     db.query(sql, [email,password], (err,rows) => {
    //         if(err) throw err
    //         else if (rows.length > 0){
    //             res.end(`${email}, berhasil login!`);
    //         } else {
    //             res.end("Email/password anda salah!");
    //         }
    //     })
    // }
}