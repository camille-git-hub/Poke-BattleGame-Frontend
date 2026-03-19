import type { Pokemon } from "../types/Pokemon.ts";

const API_URL = import.meta.env.VITE_API_URL

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const fetchPokemons = async (setPokemons: SetState<Pokemon[]>, setLoading: SetState<boolean>, setError: SetState<string | null>) => {
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

const fetchPokemonByName = async (setPokemon: SetState<Pokemon>, setLoading: SetState<boolean>, setError: SetState<string | null>, name: string) => {
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

const getToken = () => {
  return localStorage.getItem("token");
}


const signUp = async (userData: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to register user in API. Please try again.');
    }
};

const login = async (credentials: { email: string; password: string } ) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to login. Please check your credentials and try again.');
    }
};

export { getToken, signUp, login, fetchPokemons, fetchPokemonByName };  
