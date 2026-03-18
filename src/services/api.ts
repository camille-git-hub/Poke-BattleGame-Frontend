import type { Pokemon } from "../types/Pokemon.ts";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const fetchPokemons = async (setPokemons: SetState<Pokemon[]>, setLoading: SetState<boolean>, setError: SetState<string | null>) => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    setPokemons(data.results);
    setLoading(false);
  } catch (err) {
    setError("Failed to fetch pokemons");
    setLoading(false);
  }
};

export const fetchPokemonByName = async (setPokemon: SetState<Pokemon>, setLoading: SetState<boolean>, setError: SetState<string | null>, name: string) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    setPokemon(data);
    setLoading(false);
  } catch (err) {
    setError("Failed to fetch pokemon");
    setLoading(false);
  }
};