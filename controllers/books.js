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
  async getBookDetail(req, res, next) {
    const { googleId } = req.params
    const book = await Book.findOne({ googleId })
    res.send(book)
  },

  async addBook(req, res, next) {
    const { username } = req.params
    const volume = req.body
    const { info, googleId } = volume
    console.log(volume)
    let user = await User.findOne({ username })
    let book = await Book.findOne({ googleId })
    if (!book) {
      book = await Book.create({ googleId, info })
    }
    let alreadyHave = false
    for (let usersBook of user.books) {
      console.log(usersBook.googleId, book.googleId)
      if (usersBook.googleId === book.googleId) {
        alreadyHave = true
        res.send("you have this book already")
        return
      }
    }
    if (!alreadyHave) {
      const userData = {
        id: user._id,
        username: user.username,
        country: user.country,
      }
      await book.users.push(userData)
      await user.books.push(book)
      book.save()
      user.save()
      res.send({ books: user.books })
    }
  },
  async destroyBook(req, res, next) {
    const { username } = req.params
    const { googleId } = req.query

    let user = await User.findOne({ username })
    let book = await Book.findOne({ googleId })
    for (let i = 0; i < user.books.length; i++) {
      if (user.books[i].googleId === googleId) {
        user.books.splice(i, 1)
        await user.save()
        break
      }
    }
    for (let j = 0; j < book.users.length; j++) {
      if (book.users[j]._id === user._id) {
        await book.users.splice(j, 1)
        await book.save()
        break
      }
    }
    if (book.users.length === 1) {
      await Book.deleteOne({ googleId })
    }
    res.send(user.books)
  },
}
