'use strict'

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const {checkToken} = require('../auth/token_validation');
const router = new express.Router();

router.post("/tambah", pendudukController.add)
router.delete("/hapus", pendudukController.delete)
router.put("/ubah", pendudukController.update)

router.get("/", checkToken,pendudukController.index)
router.post("/daftar", pendudukController.registrasi)
router.post("/login", pendudukController.login)


module.exports = router