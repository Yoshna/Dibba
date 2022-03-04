const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/redirect`,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      let user = await User.findOne({ googleId: profile.id });
      console.log(req.body);
      console.log(req.session);
      if (user) {
        if (req.session.route === "login") {
          console.log("login");
          done(null, user, { message: "Already present" });
        } else {
          done(null, false, { message: "Already signed up, please log in" });
        }
      } else {
        // const tasks = await Task.findOne().select("_id");
        // console.log(tasks);
        if (req.session.route === "signup") {
          console.log("signup");
          user = new User({
            name: profile.displayName,
            googleId: profile.id,
            emailId: profile.emails[0].value,
            outlet: [],
            orders: [],
            //   tasks: tasks,
          });
          await user.save();
          done(null, user, { message: "User Saved" });
        } else {
          done(null, false, { message: "Sign up first" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
