// parte en la carpeta views y entra a cada carpeta segun pedido

const fs = require("fs");
const path = require("path");

const professionalsFilePath = path.join(
  __dirname,
  "../database/professionalsList.json"
); //traigo la ruta a la base de datos
const professionalsFileText = fs.readFileSync(professionalsFilePath, "utf-8"); // me traigo los datos de JSON (formato txt)
const professionals = JSON.parse(professionalsFileText); //lo parseo para poder tener el ARRAY DE PRODUCTOS (array de obj)

module.exports = {
  rubros: (req, res) => {
    res.render("rubros");
  },

  professionalDetail: (req, res) => {
    const profObject = professionals.filter(function (prof) {
      return prof.cuit == req.params.cuit;
      //"prof" es c/ pos del array (un obj en particular)
      //filtro el array de obj y devuelvo aquel obj con cuit pasado por url
    });
    res.render("professionals/professionalDetail", { profObject: profObject }); //carpeta professionals
  },

  registerProf: (req, res) => {
    res.render("professionals/registerProf");
  },

  profManagement: (req, res) => {
    res.render("professionals/editProf"); //carpeta professionals
  },

  profPerRubro: (req, res) => {
    const rubro = professionals.filter(function (prof) {
      return prof.jobTitle == req.params.rubro;
    });
    res.render("professionals/profPerRubro", { rubro: rubro });
    //uso el req.params para filtrar por rubro
  },
};
