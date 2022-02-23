'use strict'

const db = require('../db')
const bcrypt = require('bcrypt');
const secret = '%&*%%$###%'
const jsonwebtoken = require('jsonwebtoken');

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    index: (req, res) => {
        let sql = "select * from data_penduduk"
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
        let sql = "insert into data_penduduk SET ?";
        if (data.alamat && data.nama) {
            db.query(sql, data, (err) => {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: "Added succes",
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
                        message: `ID ${id} deleted.`,
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
        db.query(`update data_penduduk set ? where id = '${id}'`, new_dt, (err, result) => {
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

    // LOGIN & REGISTRASI

    registrasi: (req, res) => {
        const {
            nama,
            email,
            password
        } = req.body
        if(!nama, !email || !password) res.status(402).json({message : 'nama,email & password harus diisi'});
        return db.query("INSERT INTO akun SET ?", {nama, email ,password:hashPassword(password)}, (err, result) => {
            if(err) throw err
            else{
                return res.json({message : 'Registrasi berhasil', data:result});
            }
        })
    },

    login: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password)
        return res.status(402).json({ message: "Data tidak lengkap" });
    
        return db.query(
            "select * from akun where email = ?",
            email,
        (err, result) => {
            if (err) return res.status(500).json({ err });
    
            const user = result[0];
            if (typeof user === "undefined")
                return res.status(401).json({ message: "Email tidak terdaftar" });
            if (!bcrypt.compareSync(password, user.password))
                return res.status(401).json({ message: "Kredensial salah" });
    
            const token = jsonwebtoken.sign({ data: user }, secret);
            return res.json({ message: "Berhasil login, akses token", token });
            }
        );
    },
}