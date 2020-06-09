const User = require("../models/User")

module.exports = {
  async editUser(req, res, next) {
    const { username } = req.params
    const updateObj = req.body
    await User.findOneAndUpdate({ username }, updateObj)

    res.send("user update successful")
  },

  async getUserInfo(req, res, next) {
    const { username } = req.params
    const user = await User.findOne({ username })
    const { firstName, lastName, city, country } = user

    const userInfo = {
      firstName,
      lastName,
      city,
      country,
    }
    res.send(userInfo)
  },
  async getUserPublic(req, res, next) {
    const { username } = req.params
    const user = await User.findOne({ username })
    const { country, city, books } = user
    const userInfo = {
      username,
      country,
      city,
      books,
    }
    res.send(userInfo)
  },
}
