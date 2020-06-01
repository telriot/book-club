const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy

const userLocalStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { message: "Incorrect credentials" })
        }
        if (!user.checkPassword(password)) {
          return done(null, false, { message: "Incorrect credentials" })
        }

        return done(null, user)
      })
    } catch (error) {
      console.log(error)
    }
  }
)

module.exports = userLocalStrategy
