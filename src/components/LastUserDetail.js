import React from "react";
import { useState, useEffect } from "react";

function LastUserDetail() {
  const [infoRequerida, setInfoRequerida] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/clients/api/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.listado[data.listado.length - 1].id);
        return data.listado[data.listado.length - 1].id;
      })
      .then((data) => fetch(`http://localhost:3001/clients/api/users/${data}`))
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        setInfoRequerida({
          datos,
        });
      });
  }, []);

  if (infoRequerida.length < 1) {
    return <div className="col-lg-6 mb-4">Cargando ...</div>;
  } else {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h2>Client Id: {infoRequerida.datos.listado[0].id}</h2>
            <h5 className="m-0 font-weight-bold text-gray-800">
              Último Cliente en la Database es: "
              {infoRequerida.datos.listado[0].firstName}{" "}
              {infoRequerida.datos.listado[0].lastName}"
            </h5>
          </div>
          <div className="card-body">
            <div className="text-center">
              {console.log(
                `../../../website/public${infoRequerida.datos.listado[0].urlAvatar}`
              )}
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: 40 + "rem" }}
                src={require(`../../../website/public${infoRequerida.datos.listado[0].urlAvatar}`)}
                alt={`../../../website/public${infoRequerida.datos.listado[0].urlAvatar}`}
              />
            </div>
            <p>Email: {infoRequerida.datos.listado[0].email}</p>
            <p>Ciudad: {infoRequerida.datos.listado[0].city_Id}</p>
            <p>Movil: {infoRequerida.datos.listado[0].mobile}</p>
            <p>Rol: {infoRequerida.datos.listado[0].role}</p>
            {/* <a
              className="btn btn-danger"
              // target="_blank"
              rel="nofollow"
              href="/"
            >
              View movie detail
            </a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default LastUserDetail;
