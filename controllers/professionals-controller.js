//listado de profesionales segun rubro

// parte en la carpeta views y entra a cada carpeta segun pedido

module.exports = {
  professionals: (req, res) => {
    res.render("professionals");
  },

  professionalDetail: (req, res) => {
    res.render("professionals/professionalDetail");
  },

  registerProf: (req, res) => {
    res.render("professionals/registerProf");
  },

  profManagement: (req, res) => {
    res.render("professionals/profManagement");
  },

  plumbers: (req, res) => {
    res.render("professionals/plumbers");
  },

  category: (req, res) => {
    res.render("professionals/plumbers");
    //uso el req.params para filtrar por rubro
  },
};
