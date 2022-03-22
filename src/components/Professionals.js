import React from "react";
import ProfessionalList from "./ProfessionalList";
import { useState, useEffect } from "react";

function Professionals() {
  const [infoRequerida, setInfoRequerida] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/rubros/api/professionals")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfoRequerida(
          data.data.listado.map((data) => {
            return {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              workDays: data.workDays,
              workZones: data.workZones,
              profession: data.profession,
              url: data.url,
            };
          })
        );
      });
  }, []);

  // const newInfoRequerida = infoRequerida.listado.map(data => {
  // let tableRowsData =infoRequerida;

  // useEffect(() => {setInfoRequerida(newInfoRequerida)},[]);

  return (
    /* <!-- DataTales Example --> */
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Disponibilidad</th>
                <th>Zona de Trabajo</th>
                <th>Profesion</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {infoRequerida.map((row, i) => {
                return <ProfessionalList {...row} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Professionals;
