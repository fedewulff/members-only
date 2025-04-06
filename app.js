const express = require("express");
const app = express();
require("dotenv").config();

const session = require("express-session");
const passport = require("passport");

const homeRouter = require("./routes/homeRoute");
const signUpRouter = require("./routes/signupRoute");
const logInRouter = require("./routes/loginRoute");
const becomeMemberRouter = require("./routes/becomeMemberRoute");
const logOutRouter = require("./routes/logoutRoute");
const writeMessageRouter = require("./routes/writeMessageRoute");
const path = require("node:path");
// const { argv } = require("node:process");
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));

app.set("view engine", "ejs");

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/signup", signUpRouter);
app.use("/login", logInRouter);
app.use("/becomeMember", becomeMemberRouter);
app.use("/logout", logOutRouter);
app.use("/writeMessage", writeMessageRouter);

// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message || "Internal server error");
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
