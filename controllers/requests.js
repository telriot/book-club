const Book = require("../models/Book")
const User = require("../models/User")
const Request = require("../models/Request")
module.exports = {
  async getRequests(req, res, next) {
    const { username } = req.params
    const user = await User.findOne({ username })
      .populate("requestsIn")
      .populate("requestsOut")
      .exec()
    console.log(user)
    if (user) {
      const { requestsIn, requestsOut } = user
      res.send({ requestsIn, requestsOut })
    } else {
      res.send("you must be authenticated to access these resources")
    }
  },
  async sendRequest(req, res, next) {
    const { author, receiver, bookIn } = req.body
    const authorUser = await User.findById(author.id)
      .populate("requestsOut")
      .exec()
    const receiverUser = await User.findById(receiver.id)
    console.log(author, receiver, bookIn)
    if (authorUser && receiverUser) {
      const request = await Request.create({
        author,
        receiver,
        bookIn,
        status: "pending",
      })
      authorUser.requestsOut.push(request)
      receiverUser.requestsIn.push(request)
      await authorUser.save()
      await receiverUser.save()
      res.send(authorUser.requestsOut)
    } else {
      res.send("something went wrong")
    }
  },
  async declineRequest(req, res, next) {
    const { id } = req.body
    const declinedRequest = await Request.findByIdAndUpdate(id, {
      status: "declined",
    })
    if (declinedRequest) {
      res.send("request succesfully declined")
    } else {
      res.send("something went wrong")
    }
  },
  async cancelRequest(req, res, next) {
    const { id } = req.body
    const cancelledRequest = await Request.findByIdAndUpdate(id, {
      status: "cancelled",
    })
    if (cancelledRequest) {
      res.send("request succesfully cancelled")
    } else {
      res.send("something went wrong")
    }
  },
  async acceptRequest(req, res, next) {
    console.log("accepted")
    const { bookIn, bookOut, tradeId, authorId, receiverId } = req.body

    //Remove book from trade author bookshelf
    //Remove book from trade receiver bookshelf
    const author = await User.findById(authorId)
    const receiver = await User.findById(receiverId)
    if (author && receiver) {
      let authorsBookRemoved = false
      let receiversBookRemoved = false

      for (let i = 0; i < author.books.length; i++) {
        if (author.books[i].googleId === bookOut) {
          author.books.splice(i, 1)
          author.save()
          authorsBookRemoved = true
          break
        }
      }
      for (let j = 0; j < receiver.books.length; j++) {
        if (receiver.books[j].googleId === bookIn) {
          receiver.books.splice(j, 1)
          receiver.save()
          receiversBookRemoved = true
          break
        }
      }
      if (authorsBookRemoved && receiversBookRemoved) {
        console.log("books succesfully removed")
      } else {
        console.log("something went wrong removing the books")
      }
    }
    //Get trade id and find trade

    const authorsBook = await Book.findOne({ googleId: bookOut })
    const receiversBook = await Book.findOne({ googleId: bookIn })
    //Add picked book to request.bookOut
    await Request.findByIdAndUpdate(tradeId, {
      status: "completed",
      bookOut: { title: authorsBook.title, googleId: authorsBook.googleId },
    })
    //Remove author from book users
    //Remove receiver from book users
    if (authorsBook && receiversBook) {
      let authorRemoved = false
      let receiverRemoved = false
      if (authorsBook.users.length === 1) {
        await Book.findOneAndDelete({ googleId: bookOut })
        authorRemoved = true
      } else {
        for (let i = 0; i < authorsBook.users; i++) {
          if (authorsBook.users[i].username === author.username) {
            authorsBook.users.splice(i, 1)
            authorsBook.save()
            authorRemoved = true
            break
          }
        }
      }
      if (receiversBook.users.length === 1) {
        await Book.findOneAndDelete({ googleId: bookIn })
        receiverRemoved = true
      } else {
        for (let j = 0; j < receiver.books; j++) {
          if (receiversBook.users[j].username === author.username) {
            receiversBook.users.splice(j, 1)
            receiversBook.save()
            receiverRemoved = true
            break
          }
        }
      }
      if (authorRemoved && receiverRemoved) {
        console.log("users succesfully removed")
      } else {
        console.log("something went wrong removing the authors")
      }
    }

    res.send("trade completed")

    //Change status to completed
  },
}
