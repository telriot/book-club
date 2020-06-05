require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("./passport")
const authRouter = require("./routes/auth")
const booksRouter = require("./routes/books")
const indexRouter = require("./routes/index")
const requestsRouter = require("./routes/requests")
const usersRouter = require("./routes/users")

const app = express()

//Connect to the DB
mongoose.connect(
  /*process.env.MONGO_URI || */ `mongodb://localhost:27017/book-club`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("DB Connected")
})
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

// Setup public assets directory
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
)

//Passport
app.use(passport.initialize())
app.use(passport.session())

// Mount Routes
app.use("/api/", indexRouter)
app.use("/api/auth", authRouter)
app.use("/api/books", booksRouter)
app.use("/api/requests", requestsRouter)
app.use("/api/users", usersRouter)

module.exports = app
