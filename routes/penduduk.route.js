'use strict'

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const router = new express.Router();

router.get("", pendudukController.index)
router.post("/tambah", pendudukController.add)
router.delete("/hapus", pendudukController.delete)
router.put("/ubah", pendudukController.update)


module.exports = router