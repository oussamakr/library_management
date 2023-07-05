import React, { useState, useContext } from "react";
import { Mycontext } from "../context/Mycontext";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Add_livre = () => {
  const navigate = useNavigate();
  const { getAllcategorie, categoriesNoms } = useContext(Mycontext);

  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [description, setDescription] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [file, setFile] = useState(null);

  const handle_livre = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("auteur", auteur);
      formData.append("description", description);
      formData.append("categorieId", categorieId);
      formData.append("file", file);
    
  
      const response = await axios.post(
        "http://localhost:4000/admin_api/add_livre",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
  
      if (response.status === 200) {
        // Livre ajouté avec succès
        console.log("Livre ajouté avec succès");
        toast.success('Livre ajouté avec succès')
      
        // Réinitialiser les champs de saisie
        setTitre("");
        setAuteur("");
        setDescription("");
        setCategorieId("");
        setFile(null);
        getAllcategorie()
        navigate("/livre");
      } else if (response.status === 404) {
        // La catégorie n'existe pas
        console.log("La catégorie n'existe pas");
        // Réinitialiser les champs de saisie
        setTitre("");
        setAuteur("");
        setDescription("");
        setCategorieId("");
        setFile(null);
      } else if (response.status === 400) {
        // Le livre existe déjà dans la catégorie ou le fichier PDF existe déjà
        console.log("Ce livre existe déjà dans la catégorie ou le fichier PDF existe déjà");
        // Réinitialiser les champs de saisie
        setTitre("");
        setAuteur("");
        setDescription("");
        setCategorieId("");
        setFile(null);
      } else {
        // Une erreur s'est produite lors de l'ajout du livre
        toast.info(`${response.data.message}`)
        console.log(response.data.message);
      }
    } catch (error) {
      if (error.response) {
      toast.error(`${error.response.data.message}`)
        console.log(error.response.data.message);
      } else if (error.request) {
        toast.error(`${error.request}`)
        console.log(error.request);
      } else {
        toast.error(`${error.message}`)
        console.log(error.message);
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
         <ToastContainer />
      <div className="card w-25 text-center">
        <div className="card-body">
          <form onSubmit={handle_livre} enctype="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="exampleInputtitre" className="form-label">
                Titre
              </label>
              <input
              required
                type="text"
                className="form-control"
                id="exampleInputtitre"
                name="titre"
                value={titre || ""}
                placeholder="titre de livre"
                onChange={(e) => {
                  setTitre(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputauteur" className="form-label">
                Auteur
              </label>
              <input
              required
                type="text"
                className="form-control"
                id="exampleInputauteur"
                name="auteur"
                value={auteur || ""}
                placeholder="auteur de livre"
                onChange={(e) => {
                  setAuteur(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInpudescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInpudescription"
                name="description"
                value={description || ""}
                placeholder="description de livre"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInpucategorie" className="form-label">
                Catégorie
              </label>
              <select
              required
                className="form-select"
                id="exampleInpucategorie"
                name="categorieId"
                value={categorieId || ""}
                onChange={(e) => {
                  setCategorieId(e.target.value);
                }}
              >
                <option  value="">Choisissez une catégorie</option>
                {categoriesNoms.map((nomCategorie, index) => (
                  <option r key={index} value={nomCategorie}>
                    {nomCategorie}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Fichier
              </label>
              <input
                className="form-control"
                required
                type="file"
                id="formFile"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Ajouter Livre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
