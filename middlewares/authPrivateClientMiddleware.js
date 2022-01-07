function authPrivateClientMiddleware(req, res, next) {
  if (req.params.dni == req.session.clientFound.dni) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = authPrivateClientMiddleware;
