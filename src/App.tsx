//import { fetchPokemons } from "./services/api.ts";
//import { SearchBar } from "./components/SearchBar.tsx";
//import PokeCard from "./components/PokemonCard.tsx";
//import { savePoke } from "./services/storage.ts";
import { Routes, Route } from "react-router-dom";
import Mainlayout from "./layouts/mainlayout.tsx";
import AuthRoute from "./layouts/protectedroute.tsx";
//import AuthProvider from "./contexts/AuthContext.tsx";
import { Home } from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PokemonDetails from "./pages/PokemonDetails.tsx";
import Battle from "./pages/Battle.tsx";
import Roster from "./pages/Roster.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
function App() {
 
  return (
   <Routes>
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="pokemons/:id" element={<PokemonDetails />} />
              
      <Route element={<AuthRoute />}>
        <Route path="battle" element={<Battle />} />
        <Route path="roster" element={<Roster />} />
      </Route>
    </Route>
  </Routes>
  ) 
}

export default App
