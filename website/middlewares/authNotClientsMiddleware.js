function authNotClientstMiddleware(req, res, next) {
  if (
    req.session.clientFound == undefined &&
    req.session.userRole == undefined
  ) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = authNotClientstMiddleware;
