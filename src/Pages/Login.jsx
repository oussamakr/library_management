import React, { useState ,useContext,useEffect} from "react";
import axios from "axios";
import { Mycontext } from "../context/Mycontext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();

  const {   setLogindata,
    logindata } = useContext(Mycontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/client_api/login_client", {
        email: email,
        motDePasse: password,
        credentials: "include",
      });
      console.log(response.data.user_Data);
      if (response.status === 200) {
       
        // Connexion réussie
        toast.success("Connexion réussie");
        // Réinitialiser les champs de saisie
        setEmail("");
        setPassword("");
      setLogindata(response.data.user_Data)
      localStorage.setItem("info_login", JSON.stringify(response.data.user_Data));
        navigate('/livres')
        
        // Rediriger vers la page d'accueil ou autre page
      } else {
        // Une erreur s'est produite lors de la connexion
        toast.error("Une erreur s'est produite lors de la connexion");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Une erreur s'est produite lors de la communication avec le serveur"
        );
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <ToastContainer />
      <div className="card w-25 text-center">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Adresse e-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
             
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
      
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Se connecter
            </button>
          </form>
        </div>{" "}
      </div>{" "}
    </div>
  );
};
