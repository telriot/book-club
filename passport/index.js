const passport = require("passport")
const userLocalStrategy = require("./userLocalStrategy")
const User = require("../models/User")
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use("local", userLocalStrategy)

module.exports = passport
