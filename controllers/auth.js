const User = require("../models/User")

module.exports = {
  async getUser(req, res, next) {
    if (req.user) {
      res.json({
        user: req.user,
        username: req.session.passport.user.username,
        id: req.session.passport.user._id,
      })
    } else {
      res.json({ user: null })
    }
  },

  async createUser(req, res, next) {
    const { username, password, email, country } = req.body
    await User.findOne({ username }, (err, user) => {
      if (err) {
        res.send(err)
      } else if (user) {
        res.json({ error: `The username '${username}' is already in use` })
      } else {
        const user = new User({
          username,
          password,
          email,
          country,
        })
        user.save((err, savedUser) => {
          if (err) {
            console.log(err)
            return res.json(err)
          } else {
            res.json(savedUser)
          }
        })
      }
    })
  },

  loginUser(req, res, next) {
    const { username, _id } = req.user
    const userInfo = { username: username, id: _id }
    res.send(userInfo)
  },

  logoutUser(req, res, next) {
    if (req.user) {
      req.logout()
      console.log("logging out")
      res.send({ msg: "logged out" })
    } else {
      console.log("no user to log out")
      res.send({ msg: "no user to log out" })
    }
  },
}
