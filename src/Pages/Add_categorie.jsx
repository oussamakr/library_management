import React, { useState, useContext } from "react";
import { Mycontext } from "../context/Mycontext";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Add_categorie = () => {
  const navigate = useNavigate();
  const [nomcategorie, setName_categorie] = useState("");
  const { getAllcategorie } = useContext(Mycontext);

  const handle_categorie = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:4000/admin_api/add_categorie",
        {
          nomcategorie: nomcategorie,
        }
      );
  
      if (response.status === 201) {
        // Catégorie ajoutée avec succès
        toast.success("Catégorie ajoutée avec succès");
        // Réinitialiser le champ de saisie
        setName_categorie("");
        getAllcategorie();
        navigate("/categorie");
      } else if (response.status === 409) {
        // Catégorie existe déjà
        toast.error("Cette catégorie existe déjà");
      } else {
        // Une erreur s'est produite lors de l'ajout de la catégorie
        toast.error("Une erreur s'est produite lors de l'ajout de la catégorie");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Une erreur s'est produite lors de la communication avec le serveur");
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <ToastContainer></ToastContainer>
      <div className="card w-25 text-center">
        <div className="card-body">
          <form onSubmit={handle_categorie}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Categorie
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="nomcategorie" 
                value={nomcategorie || ""}
                placeholder="category name"
                onChange={(e) => {
                  setName_categorie(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
