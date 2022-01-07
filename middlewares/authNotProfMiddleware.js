function authNotProftMiddleware(req, res, next) {
  if (req.session.profFound == undefined) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = authNotProftMiddleware;
