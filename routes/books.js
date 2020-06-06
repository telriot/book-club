const express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const {
  getBooks,
  getMyBooks,
  getMyLatestEntries,
  addBook,
  destroyBook,
  getBookDetail,
} = require("../controllers/books")
router.get("/", asyncErrorHandler(getBooks))
router.get("/:username", asyncErrorHandler(getMyBooks))
/*router.get("/:username/latest", asyncErrorHandler(getMyLatestEntries))*/
router.get("/detail/:googleId", asyncErrorHandler(getBookDetail))
router.post("/:username", asyncErrorHandler(addBook))
router.delete("/:username", asyncErrorHandler(destroyBook))

module.exports = router
