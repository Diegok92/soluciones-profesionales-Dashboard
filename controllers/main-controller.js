// para todos los links del home, nosotros, about, etc
module.exports = {
  home: (req, res) => {
    res.render("index");
  },
  login: (req, res) => {
    res.render("login");
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
  productDetail: (req, res) => {
    res.render("productDetail");
  },
  registerClient: (req, res) => {
    res.render("registerClient");
  },
  registerProf: (req, res) => {
    res.render("registerProf");
  },
};
