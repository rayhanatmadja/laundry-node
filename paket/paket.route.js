'use strict'

const express = require('express')
const paketController = require('./paket.controller')
const router = new express.Router();

router.get("", paketController.index)
router.post("/tambah", paketController.add)
router.delete("/hapus", paketController.delete)
router.put("/ubah", paketController.update)

module.exports = router