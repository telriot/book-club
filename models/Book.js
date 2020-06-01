const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.promise = Promise
const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: Array,
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book
