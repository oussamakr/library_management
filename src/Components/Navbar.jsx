import React ,{useContext}from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../context/Mycontext";

export const Navbar = () => {
  const { logindata } = useContext(Mycontext);
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/livres">
                Livres
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/client">
            Clients
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link active" to="/categorie">
              Categorie
              </Link>
            </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-2">
            <li className="nav-item dropdown ">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
            {logindata.nom ?  <>{logindata.nom}</>: <>User Name</>  }
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>
             
            
             
           
              </ul>
            </li>
            
          </ul>
        
        </div>


        
      </div>
    </nav>
  );
};
