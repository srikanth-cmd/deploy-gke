const express = require("express");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const sessionsRouter = require("./src/routers/sessionsRouter");
const adminRouter = require("./src/routers/adminRouter");
const authRouter = require("./src/routers/authRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");


const port = process.env.port || 3000;
const app = express();
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({ secret: "globomantics", resave: false, saveUninitialized: false })
);

require("./src/config/passport.js")(app);

app.set("views", "./src/views/");
app.set("view engine", "ejs");

app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.render("index", { title: "capgemini" });
});

app.listen(port, () => {
  debug("listening !!!");
});
