'use strict'

const express = require("express");
const router = new express.Router();
const controller = require("../controllers/penduduk.controller")

router.get("/", controller.index)
router.post("/tambah", controller.tambah);
router.put("/ubah", controller.ubah);
router.delete("/hapus", controller.hapus);

module.exports = router