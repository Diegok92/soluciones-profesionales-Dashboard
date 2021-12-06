// parte en la carpeta views y entra a cada carpeta segun pedido

const { application } = require("express");
const fs = require("fs");
const path = require("path");

const professionalsFilePath = path.join(
  __dirname,
  "../database/professionalsList.json"
); //traigo la ruta a la base de datos
const professionalsFileText = fs.readFileSync(professionalsFilePath, "utf-8"); // me traigo los datos de JSON (formato txt)
const professionals = JSON.parse(professionalsFileText); //lo parseo para poder tener el ARRAY DE PRODUCTOS (array de obj)

function saveProf() {
  const profEnTxt = JSON.stringify(professionals); //paso a txt el array p/ luego agregar/modificar la database
  fs.writeFileSync(professionalsFilePath, profEnTxt, "utf-8"); //sobreescribo el JSON
}

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

  createProf: (req, res) => {
    const newProfessional = { ...req.body };

    professionals.push(newProfessional);

    saveProf();

    res.redirect("/");
  },

  editProf: (req, res) => {
    const aEditar = professionals.filter(function (prof) {
      return prof.cuit == req.params.cuit;
    });
    res.render("professionals/editProf", { aEditar: aEditar }); //carpeta professionals
  },

  updateProf: (req, res) => {
    const indexProfBuscado = professionals.findIndex(function (prof) {
      return prof.cuit == req.params.cuit;
    });

    const updateProf = {
      //cuit: professionals[indexProfBuscado].cuit,
      //jobTitle: professionals[indexProfBuscado].jobTitle, //mantego los valores originales
      ...req.body,

      // firstName: professionals[indexProfBuscado].firstName,
      // lastName: professionals[indexProfBuscado].lastName,
      // email: professionals[indexProfBuscado].email,
      // adress: professionals[indexProfBuscado].adress,
      // cuit: professionals[indexProfBuscado].cuit,
      // jobTitle: professionals[indexProfBuscado].jobTitle,
      // license: professionals[indexProfBuscado].license,
      // jobZone: professionals[indexProfBuscado].jobZone,
      // jobDay: professionals[indexProfBuscado].jobDay,
      // jobTime: professionals[indexProfBuscado].jobTime,
      // price: professionals[indexProfBuscado].price,
      // emergency: professionals[indexProfBuscado].emergency,
      // whyMe: professionals[indexProfBuscado].whyMe,
      // cbu: professionals[indexProfBuscado].cbu,
      // password: professionals[indexProfBuscado].password,
    };

    professionals[indexProfBuscado] = updateProf; //reemplazo el actualizado en el listado original

    saveProf();

    const profession = req.params.jobTitle;
    const cuit = req.params.cuit;
    res.redirect("/rubros");
  },

  profPerRubro: (req, res) => {
    const rubro = professionals.filter(function (prof) {
      return prof.jobTitle == req.params.rubro;
    });
    res.render("professionals/profPerRubro", { rubro: rubro });
    //uso el req.params para filtrar por rubro
  },
};
