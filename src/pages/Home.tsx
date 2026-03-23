import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import PokeCard from "../components/PokeCard.tsx";
import type { Pokemon } from "../types/Pokemon.ts";

import {mapPokeApiToPokemon} from "../utils/mapPokemon.tsx";

type PokemonListItem = { name: string; url: string };

function sampleNames<T>(arr: T[], n: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export const Home = () => {
  const [previewPokemons, setPreviewPokemons] = useState<Pokemon[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSavePokemon = (poke: Pokemon) => {
    setPokemons((prev) =>
      prev.map((p) => (p.name === poke.name ? { ...p, saved: true } : p))
    );
    setPreviewPokemons((prev) =>
      prev.map((p) => (p.name === poke.name ? { ...p, saved: true } : p))
    );
  };

  const handleDeletePokemon = (pokeName: string) => {
    setPokemons((prev) =>
      prev.map((p) => (p.name === pokeName ? { ...p, saved: false } : p))
    );
    setPreviewPokemons((prev) =>
      prev.map((p) => (p.name === pokeName ? { ...p, saved: false } : p))
    );
  };

  async function loadRandomPreview() {
    setPreviewLoading(true);

    try {
      
      const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
      if (!listRes.ok) throw new Error("Failed to fetch Pokémon list");
      const listData: { results: PokemonListItem[] } = await listRes.json();

     
      const picks = sampleNames(listData.results, 12);

      
      const details = await Promise.all(
        picks.map(async (pick) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pick.name}`);
          if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${pick.name}`);
          return mapPokeApiToPokemon(await res.json());
        })
      );

      setPreviewPokemons(details);
    } catch (err) {
      setPreviewError((err as Error).message);
    } finally {
      setPreviewLoading(false);
    }
  }

  useEffect(() => {
    void loadRandomPreview();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokemon not found");
      const result = (await res.json()) as Pokemon;
      setPokemons([mapPokeApiToPokemon(result)]);
    } catch (err) {
      setError((err as Error).message);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold mb-4 text-center mt-4">Pokemon Battleground</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <p className="text-red-600">{error}</p>}

      {pokemons.length > 0 && (
        <div>
          <h2 className="mb-4">Results: {pokemons.length} pokemon found</h2>
          <PokeCard
            pokemons={pokemons}
            onSave={handleSavePokemon}
            onDelete={handleDeletePokemon}
          />
        </div>
      )}
        <section className="mb-8 hline border-t border-warning pt-6">
      </section>
      
        <section className="mb-8">

        {previewError && <p className="text-red-600">{previewError}</p>}

        {previewPokemons.length > 0 && (
          <PokeCard
            pokemons={previewPokemons}
            onSave={handleSavePokemon}
            onDelete={handleDeletePokemon}
          />
        )}
      </section>
    </div>
  );
};

export default Home;