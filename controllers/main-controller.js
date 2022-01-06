// para todos los links del home, nosotros, about, etc
module.exports = {
  home: (req, res) => {
    res.render("index");
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
  login: (req, res) => {
    res.render("login");
  },
};
