import React from "react";
import image from "../assets/images/logo-DH.png";
import ContentWrapper from "./ContentWrapper";
import Rubros from "./Rubros";
import LastClientDb from "./LastClientDb";
import ContentRowData from "./ContentRowData";
import NotFound from "./NotFound";
import Clients from "./Clients";
import Professionals from "./Professionals";
import LastUserDetail from "./LastUserDetail";
import { Link, Route, Switch } from "react-router-dom";

function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          {/* Cambiar Imagen a SolProf */}
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="Digital House" />
          </div>
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - Sol Prof</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider" />

        {/*<!-- Heading -->*/}
        <div className="sidebar-heading">Actions</div>

        {/*<!-- Nav Item - Pages -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/Rubros">
            <i className="fas fa-fw fa-folder"></i>
            <span>Rubros</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Clientss -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/Clients">
            <i className="fas fa-fw fa-Clients-area"></i>
            <span>Clientes</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/Professionals">
            <i className="fas fa-fw fa-Clients-area"></i>
            <span>Profesionales</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/LastUserDetail">
            <i className="fas fa-fw fa-Clients-area"></i>
            <span>Ultimo Cliente</span>
          </Link>
        </li>

        {/* En un futuro implementar detalle del ultimo profesional creado */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/LastClientDb">
            <i className="fas fa-fw fa-Clients-area"></i>
            <span>Ultimo Profesional</span>
          </Link>
        </li> */}

        {/*<!-- Nav Item - Tables -->*/}
        <li className="nav-item nav-link">
          <Link className="nav-link" to="/ContentRowData">
            <i className="fas fa-fw fa-table"></i>
            <span>Totales</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}

      <Switch>
        <Route exact path="/">
          <ContentWrapper />
        </Route>
        <Route path="/Clients">
          <Clients />
        </Route>
        <Route path="/Professionals">
          <Professionals />
        </Route>
        <Route path="/Rubros">
          <Rubros />
        </Route>
        <Route path="/LastUserDetail">
          <LastUserDetail />
        </Route>
        <Route path="/ContentRowData">
          <ContentRowData />
        </Route>
        <Route component={NotFound} />
      </Switch>
      {/*<!-- End Microdesafio 2 --> */}
    </React.Fragment>
  );
}
export default SideBar;
