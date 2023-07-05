import React, { useState, useContext } from "react";
import { Mycontext } from "../context/Mycontext";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Add_client = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setmotDepasse] = useState("");
  const [type, setType] = useState("");
  const { getClients } = useContext(Mycontext);

 // Controller - Ajouter un client

// Fonction - Gérer la soumission du formulaire client
const handle_client = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:4000/admin_api/add_client",
      {
        nom: nom,
        email: email,
        motDePasse: motDePasse,
        type: type,
      }
    );

    if (response.status === 201) {
      // Client ajouté avec succès
      toast.success("Client ajouté avec succès");
      // Réinitialiser les champs de saisie
      setNom("");
      setEmail("");
      setmotDepasse("");
      setType("");
      getClients();
      navigate("/client");
    } else if (response.status === 409) {
      // Client existe déjà
      toast.error("Ce client existe déjà");
    } else {
      // Une erreur s'est produite lors de l'ajout du client
      toast.error("Une erreur s'est produite lors de l'ajout du client");
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
          <form onSubmit={handle_client}>
            <div className="mb-3">
              <label htmlFor="exampleInputNom" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputNom"
                name="nom" 
                value={nom || ""}
                placeholder="category name"
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email" 
                value={email || ""}
                placeholder="category name"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputpassword" className="form-label">
                Password
              </label>  
              <input
                type="password"
                className="form-control"
                id="exampleInputpassword"
                name="motDePasse" 
                value={motDePasse || ""}
                placeholder="password"
                onChange={(e) => {
                  setmotDepasse(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
  <label htmlFor="exampleInputtype" className="form-label">
    Type
  </label>
  <select
  className="form-select"
  id="exampleInputtype"
  name="type"
  value={type || ""}
  onChange={(e) => {
    setType(e.target.value);
  }}
>
  <option value="">Sélectionnez le type de client</option>
  <option value="abonne">abonne</option>
  <option value="normal">normal</option>
</select>

</div>

            <button type="submit" className="btn btn-primary">
              Add client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
