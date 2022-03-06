import React from 'react';
import ChartRow from './ChartRow';
import { useState, useEffect } from 'react';

 function  Chart (){

const [infoRequerida, setInfoRequerida] = useState([]);




      useEffect( () => {
        fetch("http://localhost:3001/clients/api/users")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setInfoRequerida(data.listado.map(element => {
  
              return ({id: element.id,
                  firstName:element.firstName,
                  lastName: element.lastName,
                  email:element.email,
                  url: element.url
              })
              })
              
              )});
        },[])





// const newInfoRequerida = infoRequerida.listado.map(element => {
// let tableRowsData =infoRequerida;

// useEffect(() => {setInfoRequerida(newInfoRequerida)},[]);


return (
    /* <!-- DataTales Example --> */
    <div className="card shadow mb-4">
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tfoot>
                       
                    </tfoot>
                    <tbody>
                        {
                         infoRequerida.map( ( row , i) => {
                            return <ChartRow { ...row} key={i}/>
                        })
                        }
                        

                    </tbody>
                </table>
            </div>
        </div>
    </div>

)}

    


export default Chart;