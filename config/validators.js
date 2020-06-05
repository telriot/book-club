const { check, validationResult } = require("express-validator")

const username = check("username")
  .isString()
  .isLength({ min: 5 })
  .withMessage("at least 5 characters long")
  .isLength({ max: 20 })
  .withMessage("at most 20 characters long")
const firstName = check("firstName")
  .isString()
  .isLength({ min: 2 })
  .withMessage("at least 2 characters long")
  .isLength({ max: 30 })
  .withMessage("at most 30 characters long")
const lastName = check("lastName")
  .isString()
  .isLength({ min: 2 })
  .withMessage("at least 2 characters long")
  .isLength({ max: 30 })
  .withMessage("at most 30 characters long")
const city = check("city")
  .isString()
  .isLength({ min: 2 })
  .withMessage("at least 2 characters long")
  .isLength({ max: 30 })
  .withMessage("at most 30 characters long")
const country = check("country")
  .isString()
  .isLength({ min: 2 })
  .withMessage("at least 2 characters long")
  .isLength({ max: 2 })
  .withMessage("at most 2 characters long")
const email = check("email").isEmail().withMessage("invalid email address")

const password = check("password")
  .isString()
  .isLength({ min: 6 })
  .withMessage("at least 6 characters long")
  .isLength({ max: 20 })
  .withMessage("at most 20 characters long")

module.exports = {
  userSignupValidationRules: () => {
    return [username, email, password]
  },
  userLoginValidationRules: () => {
    return [username, password]
  },
  userEditValidationRules: () => {
    return [firstName, lastName, city, country]
  },

  validate: (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({
      errors: extractedErrors,
    })
  },
}
