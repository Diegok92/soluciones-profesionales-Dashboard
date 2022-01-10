// parte en la carpeta views y entra a cada carpeta segun pedido

const { application } = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const clientsFilePath = path.join(__dirname, "../database/clients.json"); //traigo la ruta a la base de datos
const clientsFileText = fs.readFileSync(clientsFilePath, "utf-8"); // me traigo los datos de JSON (formato txt)
const clients = JSON.parse(clientsFileText); //lo parseo para poder tener el ARRAY DE PRODUCTOS (array de obj)

function saveClients() {
  const clientsEnTxt = JSON.stringify(clients); //paso a txt el array p/ luego agregar/modificar la database
  fs.writeFileSync(clientsFilePath, clientsEnTxt, "utf-8"); //sobreescribo el JSON
}

module.exports = {
  registerClients: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    res.render("users/registerClients", {
      userClient: userClient,
      userProf: userProf,
    });
  },

  clientsDetail: (req, res) => {
    const clientsObject = clients.filter(function (client) {
      return client.dni == req.params.dni;
      //"client" es c/ pos del array (un obj en particular)
      //filtro el array de obj y devuelvo aquel obj con dni pasado por dni
    });
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;

    res.render("users/clientsDetail", {
      clientsObject: clientsObject,
      userClient: userClient,
      userProf: userProf,
    });
    //ruta en carpeta
  },

  createClients: (req, res) => {
    const newClients = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    clients.push(newClients);

    saveClients();

    res.redirect("/");
  },

  editClients: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;

    const aEditar = clients.filter(function (clients) {
      return clients.dni == req.params.dni;
    });
    res.render("users/editClient", {
      aEditar: aEditar,
      userClient: userClient,
      userProf: userProf,
    }); //carpeta professionals
  },

  updateClients: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    //por aca viaja el boton "confirmar" del form editClient
    const indexClientsBuscado = clients.findIndex(function (clients) {
      return clients.dni == userClient.dni;
    });
    console.log(req);
    const updateClients = {
      ...req.body,
      password: userClient.password
    };

    clients[indexClientsBuscado] = updateClients; //reemplazo el actualizado en el listado original
console.log(updateClients);
    saveClients();

    res.redirect("/");
  },

  showDeleteClients: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    const toDelete = clients.filter((clients) => {
      return clients.dni == userClient.dni;
    });
    res.render("users/deleteClient", {
      toDelete: toDelete,
      userClient: userClient,
      userProf: userProf,
    });
  },

  deleteClients: (req, res) => {
   
    let clientsToDelete = clients.findIndex(
      (clients) => clients.dni == req.params.dni
    );
    clients.splice(clientsToDelete, 1);
    saveClients();
    req.session.destroy();
    res.redirect("/");
  },
};
