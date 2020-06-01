const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

mongoose.promise = Promise
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: Array,
  //resetPasswordToken: String,
  //resetPasswordExpires: String,
})

UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10)
  },
}

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next()
  } else {
    this.password = this.hashPassword(this.password)
    next()
  }
})

const User = mongoose.model("User", UserSchema)
module.exports = User
