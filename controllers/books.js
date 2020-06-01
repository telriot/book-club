const Book = require("../models/Book")
const User = require("../models/User")
module.exports = {
  async getBooks(req, res, next) {
    const books = await Book.find()
    res.send(books)
  },
  async getMyBooks(req, res, next) {
    const { username } = req.params
    const user = await User.findOne({ username })
    res.send(user.books)
  },
}
