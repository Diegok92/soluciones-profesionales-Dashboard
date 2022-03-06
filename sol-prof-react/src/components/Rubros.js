import React from "react";

import { useState , useEffect } from "react";


function Rubros() {



//const nuevosDatos = {"data":{"totalProfessionals":103,"infoProfession":[{"Info":{"id":1,"profession":"Mecanica"},"total":7},{"Info":{"id":2,"profession":"Electricidad"},"total":5},{"Info":{"id":3,"profession":"Odontologia"},"total":5},{"Info":{"id":4,"profession":"Plomeria"},"total":6},{"Info":{"id":5,"profession":"Carpinteria"},"total":5},{"Info":{"id":6,"profession":"Pintura"},"total":5},{"Info":{"id":7,"profession":"Abogacia"},"total":5},{"Info":{"id":8,"profession":"Full Stack Web Developer"},"total":4},{"Info":{"id":9,"profession":"Gas"},"total":5},{"Info":{"id":10,"profession":"Destapaciones"},"total":5},{"Info":{"id":11,"profession":"Catering"},"total":5},{"Info":{"id":12,"profession":"Empapelacion"},"total":5},{"Info":{"id":13,"profession":"Jardineria"},"total":5},{"Info":{"id":14,"profession":"Contaduria"},"total":5},{"Info":{"id":15,"profession":"instalaciin de AC"},"total":5},{"Info":{"id":16,"profession":"Mudanzas"},"total":5},{"Info":{"id":17,"profession":"Fumigaciin"},"total":5},{"Info":{"id":18,"profession":"Cuidado de Menores"},"total":4},{"Info":{"id":19,"profession":"Ensenanza Particular"},"total":4},{"Info":{"id":20,"profession":"Paseo Animal"},"total":4},{"Info":{"id":21,"profession":"Pileteria"},"total":4}]}}

// const datos= [1,2,3,4,5,6,7,8,9,10];

const [infoRequerida, setInfoRequerida] = useState([]);



useEffect(() => {
  
  fetch("http://localhost:3001/rubros/api/professionals")
      .then(res =>{return res.json()}) 
      .then(data => {setInfoRequerida(data.data.infoProfession)})
       ;
     }, [])

     ;

          
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Rubros
          </h5>
        </div>

     <div>


     <div className="card-body">
       {infoRequerida.map((element, i) => {return <div className="row" key={i}>
    <div className="col-lg-6 mb-4">
      <div className="card bg-dark text-white shadow">
        <div className="card-body"  >{element.Info.profession}</div>
      </div>
    </div>
   
  </div> })}
  
</div>

     </div>

      
     



        
      </div>
    </div>
  );

}

export default Rubros;
