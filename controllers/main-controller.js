// para todos los links del home, nosotros, about, etc
module.exports = {
  home: (req, res) => {
    res.render("index");
  },
  login: (req, res) => {
    res.render("users/login");
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
  professionalDetail: (req, res) => {
    res.render("professionals/professionalDetail");
  },
  registerClient: (req, res) => {
    res.render("users/registerClient");
  },
  registerProf: (req, res) => {
    res.render("professionals/registerProf");
  },
  profManagement: (req, res) => {
    res.render("professionals/profManagement");
  },
};
