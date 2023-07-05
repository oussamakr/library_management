import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import axios from "axios";

export const Mycontext = createContext(null);

export const MycontextProvider = (props) => {
  const profile_propriety = JSON.parse(localStorage.getItem("info_login")) || {
    nom: "",
    email: "",
    type: "",
  };
  const [token, setAccessToken] = useState("");
  console.log(token);
 const  [logindata, setLogindata] = useState(profile_propriety)
 console.log(logindata);
 const  [categories, setCategories] = useState([])
 const  [clients, setCclients] = useState([])


 const categoriesNoms = categories.map((objet) => objet.nomcategorie);

  const getAllcategorie = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/categorie_api/all_categorie",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const categories = response.data;
      setCategories(categories);
     

    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

 useEffect(() => {
  getAllcategorie()
}, [])


useEffect(() => {

    axios
      .get("http://localhost:4000/refresh/refresh_token", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const accessTokenn = response.data.accesstoken;
          setAccessToken(accessTokenn);
        } else {
          console.log("La requête a échoué avec le statut:", response.status);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de l'access token:",
          error
        );
      });
  
}, [token]);

const getClients = async () => {
  try {
    const response = await axios.get("http://localhost:4000/admin_api/get_client");
    const clients = response.data;
    setCclients(clients)
   
    // Traiter les clients récupérés selon vos besoins
  } catch (error) {
    console.error(error);
    // Gérer les erreurs de requête
  }
};

useEffect(() => {
  getClients()
}, [])

const [livres, setLivres] = useState([]);

  useEffect(() => {
    getLivres();
  }, []);

  const getLivres = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin_api/get_livre");
      if (response.status === 200) {
        setLivres(response.data);
     
      } else {
        console.log("Une erreur s'est produite lors de la récupération des livres");
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  




  const valueContext = {
    getAllcategorie,
    categories,
    setCategories,
    categoriesNoms,
    clients,
    getClients,
    setLogindata,
    logindata,
    getLivres,
    livres

  };

  return (
    <Mycontext.Provider value={valueContext}>
      {props.children}
    </Mycontext.Provider>
  );
};
