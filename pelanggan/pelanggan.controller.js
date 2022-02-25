'use strict'

const db = require('../db')
var bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    index: (req, res) => {
        let sql = "select * from data_pelanggan"
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
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        let sql = "insert into data_pelanggan SET ?";
        if (data.alamat && data.nama) {
            db.query(sql, data, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: "Berhasil menambah data_pelanggan",
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
            let sql = "SELECT * from data_pelanggan where id = ?"
            db.query(sql, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    data = result;
                }
            })
        }
        if (id) {
            let sql = "DELETE from data_pelanggan where id = ?";
            db.query(sql, id, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: `data_pelanggan dengan id ${id} berhasil dihapus.`,
                        data: data[0]
                    })
                }
            })
        }
    },
    update: (req, res) => {
        const id = req.body.id;
        let new_dt = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        db.query(`update data_pelanggan set ? where id = '${id}'`, new_dt, (err, result) => {
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

    registrasi: (req, res) => {
        const {
            nama,
            email,
            password
        } = req.body
        if(!nama, !email || !password) res.status(402).json({message : 'nama,email & password harus diisi'});
        return db.query("INSERT INTO akun SET ?", {nama, email ,password:bcrypt.hashSync(password)}, (err, result) => {
            if(err) throw err
            else{
                return res.json({message : 'Registrasi berhasil', data:result});
            }
        })
    },

    login: (req, res) => {
        const {
            email,
            password
        } = req.body
        if(!email || !password) res.status(402).json({message : 'email & password harus diisi'});

        return db.query("SELECT * FROM akun WHERE email=?", email, (err, result) => {
            if(err) return res.status(500).json({err});
            const user = [0];
            if(typeof user === undefined) return res.status(401).json({message: 'user tidak ditemukan'});
            if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'email/password tidak sesuai'});
            
            const token = jsonwebtoken.sign({data:user}, secret)
            return res.json({message: `Login berhasil, silahkan gunakan token ini untuk akses endpoint private lain ${token}`});
        });
    } 
}