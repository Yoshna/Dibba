exports.login = async (req, res, next) => {
  console.log(req.user);
  console.log("mid");
  if (req.user) {
    return next();
  } else {
    // return res.status(401).json({ body: null, error: "Login to continue" });
    return res.redirect(`${process.env.CLIENT_URL}/`);
  }
};
