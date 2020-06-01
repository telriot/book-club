const express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const { getBooks, getMyBooks } = require("../controllers/books")
router.get("/", asyncErrorHandler(getBooks))
router.get("/:username", asyncErrorHandler(getMyBooks))
module.exports = router
