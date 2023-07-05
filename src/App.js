import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MycontextProvider } from "./context/Mycontext";
import { Navbar } from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import { Categorie } from "./Components/Categorie";
import { Livre } from "./Components/Livre";

import { Add_categorie } from "./Pages/Add_categorie";
import { Add_livre } from "./Pages/Add_Livre";
import { Client } from "./Components/Client";
import { Add_client } from "./Pages/Add_client";
import { Login } from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <MycontextProvider>
        <Router>
          <Navbar></Navbar>
          <ToastContainer></ToastContainer>
          <Routes>
            <Route path="/livres" element={<Livre />} />
            <Route path="/categorie" element={<Categorie />} />
            <Route path="/client" element={<Client />} />
            <Route path="/add_client" element={<Add_client />} />
            <Route path="/add_categorie" element={<Add_categorie />} />
            <Route path="/add_livre" element={<Add_livre />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </MycontextProvider>
    </div>
  );
}

export default App;
