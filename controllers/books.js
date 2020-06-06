const Book = require("../models/Book")
const User = require("../models/User")
module.exports = {
  async getBooks(req, res, next) {
    const { page, limit, language, title, author, sortOrder } = req.query

    const queryBuilder = () => {
      let query = {}
      if (language) query["info.language"] = language
      if (author) query["info.authors"] = { $regex: author, $options: "i" }
      if (title) query["info.title"] = { $regex: title, $options: "i" }
      return query
    }
    const sortingBuilder = () => {
      let filterOptions
      if (sortOrder === "latest") filterOptions = "date"
      if (sortOrder === "alphabetical") filterOptions = "info.title"
      if (sortOrder === "length") filterOptions = "info.pageCount"
      if (sortOrder === "year") filterOptions = "info.publishedDate"
      return filterOptions
    }
    const sorting = sortingBuilder()
    const query = queryBuilder()
    const options = {
      page,
      limit,
      sort: { [sorting]: +1 },
    }
    await Book.paginate(query, options, (err, result) => {
      res.send(result)
    })
  },
  async getMyBooks(req, res, next) {
    const { username } = req.params
    const user = await User.findOne({ username })
    res.send(user.books)
  },

  /*async getMyLatestEntries(req, res, next) {
    const { username } = req.params
    const { limit } = req.query
    const user = await User.findOne({ username })

    let findLatestEntries = (arr) => {
      let books = []
      const startIndex = arr.length - 1
      const endIndex = arr.length - limit - 1
      for (let i = startIndex; i > endIndex; i--) {
        arr[i] && books.push(arr[i])
      }
      return books
    }
    res.send(findLatestEntries(user.books))
  },*/

  async getBookDetail(req, res, next) {
    const { googleId } = req.params
    const book = await Book.findOne({ googleId }).populate("users").exec()
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
      await book.users.push(user)
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
