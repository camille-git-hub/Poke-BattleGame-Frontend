
import { useState } from "react";
//import { fetchPokemons } from "./services/api.ts";
//import { SearchBar } from "./components/SearchBar.tsx";
//import PokeCard from "./components/PokemonCard.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
//import { savePoke } from "./services/storage.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainlayout from "./layouts/mainlayout.tsx";
//import AuthProvider from "./contexts/AuthContext.tsx";
import { Home } from "./pages/Home.tsx";
//import LoginPage from "./pages/LoginPage.tsx";
//import SignUpPage from "./pages/SignUpPage.tsx";
//import PokemonDetails from "./pages/PokemonDetails.tsx";
//import BattlePage from "./pages/BattlePage.tsx";
//import RosterPage from "./pages/RosterPage.tsx";

function App() {

  return (
          <Routes>
            <Route path="/" element={<Mainlayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<SignUpPage />} />
              </Route>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="pokemons/:id" element={<PokemonDetails />} />
              <Route path="battle" element={<BattlePage />} />
              <Route path="roster" element={<RosterPage />} />
            </Route>
        </Routes>
    ) 
}

export default App
