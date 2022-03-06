import React from "react";
import SmallCard from "./SmallCard";
import { useState, useEffect } from "react";



//

function ContentRowData() {
  const [totalProfessionals, setTotalProfessionals] = useState([]);

  const [totalProfessions, setTotalProfessions] = useState([]);

  const [totalClients, setTotalClients] = useState([]);
 
  const [totalUser, setTotalUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/rubros/api/professionals")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTotalProfessionals({
          quantity: data.data.totalProfessionals,
          title: "Total de Profesionales",
          color: "primary",
        });
        setTotalProfessions({
          quantity: data.data.infoProfession.length,
          title: "Total de Profesiones",
          color: "success",
        });
        
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/clients/api/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTotalClients({
            quantity: data.totalClients,
            title: "Total de Clientes",
            color: "info",
          });
          setTotalUser({
            quantity: data.totalUsers,
            title: "Total de Usuarios",
            color: "warning",
          });
      });
  }, []);

  

  let cartProps = [totalUser,totalClients, totalProfessionals, totalProfessions,  ];

  return (
    <div className="row">
      {cartProps.map((movie, i) => {
        return <SmallCard {...movie} key={i} />;
      })}
    </div>
  );
}

export default ContentRowData;
