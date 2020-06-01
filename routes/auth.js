const express = require("express")
var router = express.Router()
const passport = require("passport")
const { asyncErrorHandler } = require("../middleware")
const {
  getUser,
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth")
const {
  userSignupValidationRules,
  userLoginValidationRules,
  validate,
} = require("../config/validators")

router.get("/", asyncErrorHandler(getUser))

router.post(
  "/signup",
  userSignupValidationRules(),
  validate,
  asyncErrorHandler(createUser)
)

router.post(
  "/login",
  userLoginValidationRules(),
  validate,
  passport.authenticate("local"),
  asyncErrorHandler(loginUser)
)
router.post("/logout", logoutUser)

module.exports = router
