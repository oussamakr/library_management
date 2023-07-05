import React, { useContext } from "react";
import { Mycontext } from "../context/Mycontext";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Livre = () => {
  const { livres ,logindata} = useContext(Mycontext);
  console.log(logindata.type);
  return (
    <div>
      <div>
        <ToastContainer />
        <div className="container">
          <div className="card mt-2">
            <div className="card p-2">
              <div className="d-flex justify-content-left mb-2">
                <Link to="/add_livre">
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
                      Add livre
                    </span>
                  </button>
                </Link>
              </div>
              <div className="table-responsive ">
                <table className="table table-bordered ">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>N°</th>

                      <th>Titre</th>
                      <th>Auteur</th>
                      <th>description</th>
                      <th>Categorie</th>
                      <th>Lien </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {livres &&
                      livres.map((Element, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{Element.titre}</td>
                            <td>{Element.auteur}</td>
                            <td>{Element.description}</td>
                            <td>{Element.nomcategorie}</td>
                            <td>
                              {logindata.type === "abonne" ?                          <a
  to={`http://localhost:4000/telechargement_api/telechargement/${encodeURIComponent(Element.cheminFichier)}`}
  download
>
  <button className="btn btn-primary me-2">
    Télécharger PDF
  </button>
</a>: 
  <button disabled className="btn btn-primary me-2">
  Télécharger PDF                      
 <Link
  to={`http://localhost:4000/telechargement_api/telechargement/${encodeURIComponent(Element.cheminFichier)}`}
  download
  disabled
>

  
</Link> </button>}
    
                            </td>

                            <td className="d-flex justify-content-center">
                              <a>
                                <button className="btn btn-primary me-2">
                                  Details
                                </button>
                              </a>

                              <a to="#">
                                <button
                                  className="btn btn-danger"
                                  onClick={async () => {
                                    const response = await axios.delete(
                                      `http://localhost:4000/admin_api/sup_client/${Element._id}`,
                                      {
                                        headers: {
                                          // Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    );
                                    try {
                                      console.log(response);
                                      toast.success(`${response.data.message}`);
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
