'use strict'

const express = require('express')
const pelangganController = require('./pelanggan.controller')
const router = new express.Router();

router.get("", pelangganController.index)
router.post("/tambah", pelangganController.add)
router.delete("/hapus", pelangganController.delete)
router.put("/ubah", pelangganController.update)
router.post("/daftar", pelangganController.registrasi)
router.post("/login", pelangganController.login)


module.exports = router