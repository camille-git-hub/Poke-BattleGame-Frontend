
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

function App() {

  return (
          <Routes>
            <Route path="/" element={<Mainlayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<SignUpPage />} />
              <Route path="pokemons/:id" element={<PokemonDetails />} />
              <Route path="battle" element={<BattlePage />} />
              <Route path="roster" element={<RosterPage />} />
            </Route>
        </Routes>
    ) 
}

export default App
