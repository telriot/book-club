const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.promise = Promise
const RequestSchema = new Schema({
  author: { username: String, id: String },
  receiver: { username: String, id: String },
  bookIn: { title: String, googleId: String },
  bookOut: { title: String, googleId: String },
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
})

const Request = mongoose.model("Request", RequestSchema)
module.exports = Request
