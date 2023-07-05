import React, { useContext } from "react";
import { Mycontext } from "../context/Mycontext";
import { Link } from "react-router-dom";
import "./categorie.css";

export const Categorie = () => {
  const { categories } = useContext(Mycontext);

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-left mb-2 ms-5">
      <Link to="/add_categorie" >
        <button className="btncreat">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              ></path>
            </svg>{" "}
            Create New Categorie
          </span>
        </button>
      </Link>
      </div>

      <div className=" m-5 row row-cols-1 row-cols-md-2 g-4">
        {categories.map((categorie) => (
          <div className="col" key={categorie._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{categorie.nomcategorie}</h5>
                <p className="card-text">
                  Nombres des Livres : {categorie.listeDesLivres.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
