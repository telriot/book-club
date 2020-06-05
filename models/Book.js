const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.promise = Promise
const BookSchema = new Schema({
  info: Object,
  googleId: String,
  users: Array,
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book
