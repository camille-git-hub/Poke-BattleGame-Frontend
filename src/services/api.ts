import type { Pokemon } from "../types/Pokemon.ts";

// const API_URL = import.meta.env.VITE_API_URL
const AUTH_API_URL = `http://localhost:${import.meta.env.AUTH_PORT || 3000}`;

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
        console.log('Registering user with data:', userData);
        console.log('Using AUTH_API_URL:', AUTH_API_URL, 'and endpoint:', `${AUTH_API_URL}/auth/register`);
        const response = await fetch(`${AUTH_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: "include" // this is required for cookies
        });
        console.log('Received response:', response);
        console.log('Passed JSON:', JSON.stringify(userData));
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
        const response = await fetch(`${AUTH_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: "include" // this is required for cookies
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

const logout = async () => {
    try {
        const response = await fetch(`${AUTH_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include" // this is required for cookies
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to logout. Please try again.');
    }
}

export { getToken, signUp, login, fetchPokemons, fetchPokemonByName, logout };  
