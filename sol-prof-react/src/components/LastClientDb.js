import React from "react";
import imagenFondo from "../assets/images/mandalorian.jpg";
import { useState, useEffect } from "react";

function LastClientDb() {
  const [infoRequerida, setInfoRequerida] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/clients/api/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfoRequerida(
          data.listado.filter((element) => {
            return data.listado.indexOf(element) === data.listado.length - 1;
          })
        );
      });
  }, []);

  if (infoRequerida.length < 1) {
    return <div className="col-lg-6 mb-4">Cargando ...</div>;
  } else {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">
              Ultimo Cliente en la Database es: "{infoRequerida[0].firstName}{" "}
              {infoRequerida[0].lastName}"
            </h5>
          </div>
          <div className="card-body">
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: 40 + "rem" }}
                src={imagenFondo}
                alt=" Star Wars - Mandalorian "
              />
            </div>
            <p>Email: {infoRequerida[0].email}</p>
            <a
              className="btn btn-danger"
              target="_blank"
              rel="nofollow"
              href="/"
            >
              View movie detail
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LastClientDb;
