function authPrivateProfMiddleware(req, res, next) {
  if (req.params.cuit == req.session.profFound.cuit) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = authPrivateProfMiddleware;
