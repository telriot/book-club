const express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const { getUserInfo, getUserPublic, editUser } = require("../controllers/users")
const { userEditValidationRules, validate } = require("../config/validators")

router.get("/:username", asyncErrorHandler(getUserInfo))
router.get("/public/:username", asyncErrorHandler(getUserPublic))

router.put(
  "/:username",
  userEditValidationRules(),
  validate,
  asyncErrorHandler(editUser)
)

module.exports = router
