function authNotClientstMiddleware(req, res, next) {
  if (req.session.clientFound == undefined) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = authNotClientstMiddleware;
