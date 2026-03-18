import { useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import PokeCard from "../components/PokeCard.tsx";
import type { Pokemon } from "../types/Pokemon.ts";
//import { savePokemon } from "../services/storage.ts";

export const Home = () => {

const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSavePokemon = (poke: Pokemon) => {
    //savePokemon(poke);
    setPokemons(prev => prev.map(p => p.id === poke.id ? {...p, saved: true} : p));
  }

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPokemons([data]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="font-bold mb-4 text-center mt-4">Pokemon Battleground</h1>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} onSearch={handleSearch} loading={loading} />
      {error && <p style={{color: 'red'}}>{error}</p>}
      {pokemons.length > 0 && (
        <div>
        <h2 className="mb-4">Results: {pokemons.length} pokemons found</h2>
        <PokeCard pokemons={pokemons} onSave={handleSavePokemon} mode="search"/>
        </div>
    )}
    </div>
    )}

