import React, { component } from "react";
import PropTypes from "prop-types";

class Rubro extends component {
  constructor(props) {
    super(props);
    this.state = { rubro: "" };
  }

  apiCall(url, consecuencia) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => consecuencia(data))
      .catch((error) => console.log(error));
  }

  traerRubroNuevo() {
    this.apiCall(
      "http://localhost:3001/rubros/api/professionals",
      this.mostrarRubro
    );
  }

  componentDidMount() {
    console.log("me monte ;)");
    this.traerRubroNuevo();
  }

  mostrarRubro = (data) => {
    this.setState({ rubro: data.infoProfession[0].Info.profession });
  };

  componentdidUpdate() {
    console.log("Actualice");
  }

  render() {
    let contenido;
    if (this.state.rubro == "") {
      contenido = <p>Cargando...</p>;
    } else {
      contenido = <p>{this.state.rubro}</p>;
    }

    return (
      <div>
        {contenido}
        <button onClick={() => this.traerRubroNuevo()}>rubro Nuevo!</button>
      </div>
    );
  }
}

// function GenresInDb() {
//   return (
//     <div className="col-lg-6 mb-4">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3">
//           <h5 className="m-0 font-weight-bold text-gray-800">
//             Genres in Data Base
//           </h5>
//         </div>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Mecanica</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Electricidad</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Aventura</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Ciencia Ficción</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Comedia</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Documental</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Drama</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Fantasia</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Infantiles</div>
//               </div>
//             </div>
//             <div className="col-lg-6 mb-4">
//               <div className="card bg-dark text-white shadow">
//                 <div className="card-body">Musical</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// }

export default Rubro;
