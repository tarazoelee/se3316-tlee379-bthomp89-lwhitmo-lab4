const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");

const {tracks} = require('../handler/tracks');

router.get('/', tracks)

module.exports = router;