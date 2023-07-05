import React, { useContext } from "react";
import { Mycontext } from "../context/Mycontext";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Client = () => {
  const { clients,getClients } = useContext(Mycontext);
  return (
    <div>
      
      <ToastContainer />
      <div className="container">
          <div className="card mt-2">
            <div className="card p-2">
              <div className="d-flex justify-content-left mb-2">
                <Link to="/add_client">
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
                      Add Client
                    </span>
                  </button>
                </Link>
              </div>
              <div className="table-responsive ">
                <table className="table table-bordered ">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>N°</th>

                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Details</th>
                
                    </tr>
                  </thead>
                  <tbody>
                    {clients &&
                      clients.map((Element, index) => {
                    
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{Element.nom}</td>
                            <td>{Element.email}</td>
                            <td>{Element.type}</td>
                        
                         

                            <td className="d-flex justify-content-center">
                              <a
                             
                              >
                                <button className="btn btn-primary me-2">
                                  Details
                                </button>
                              </a>
                             
                              <a href="#">
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
                                      getClients();
                                      localStorage.clear()
                                      window.location.reload()
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
  )
}
