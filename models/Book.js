const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require("mongoose-paginate-v2")

mongoose.promise = Promise

const BookSchema = new Schema({
  info: Object,
  googleId: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now,
  },
})

BookSchema.plugin(mongoosePaginate)
const Book = mongoose.model("Book", BookSchema)
module.exports = Book
