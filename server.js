const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const outlets = require("./routes/outlets");
const user = require("./routes/user");
const order = require("./routes/order");
const details = require("./routes/details");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongodb.."))
  .catch((err) => console.log("Could Not Connect", err));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      // samesite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api/outlets", outlets);
app.use("/auth", user);
app.use("/api/order", order);
app.use("/api/details", details);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
