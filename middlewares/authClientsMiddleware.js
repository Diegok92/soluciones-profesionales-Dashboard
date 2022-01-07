function authClientsMiddleware(req, res, next) {
  if (
    req.session.clientFound !== undefined &&
    req.session.profFound == undefined
  ) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = authClientsMiddleware;
