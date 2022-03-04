const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google/signup",
  (req, res, next) => {
    req.session.route = "signup";
    console.log("icsb");
    console.log(req.body);
    console.log("vdwvb");
    console.log(req.session);
    console.log("fewa");
    return next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/login",
  (req, res, next) => {
    req.session.route = "login";
    return next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"],
    },
    (err, user, info) => {
      if (!user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/error?message=${info.message}`
        );
      } else {
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect(`${process.env.CLIENT_URL}/`);
        });
      }
    }
  )(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT_URL}/`);
});

router.get("/login", (req, res) => {
  // console.log(req.user);
  // console.log("gug");
  // console.log(req.sessionID);
  // console.log(req.curr);
  if (req.user) return res.send(req.user);
  else return res.send(null);
});

module.exports = router;
