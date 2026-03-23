import type { Pokemon } from "../types/Pokemon";

type Props = {
  pokemons: Pokemon[];
  onSave?: (pokemon: Pokemon) => void;
  onDelete?: (pokemonName: string) => void;
};

const PokeCard = ({ pokemons, onSave, onDelete }: Props) => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className="p-4 relative flex flex-col justify-between mb-6 border rounded-lg shadow-md">
          <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
          <p>Attack: {pokemon.stats.attack}</p>
          <div className="hover-3d">
          <figure className="max-w-100 rounded-2xl">
          <img className="object-cover w-full h-48 mb-2" src={pokemon.image} alt="3D card" />
          </figure>
          </div>

          {pokemon.isSaved ? (
            <button className="btn bg-gray-200 text-black hover:bg-red-200" onClick={() => onDelete?.(pokemon.name)}>
              Remove from Favourites
            </button>
          ) : (
            <button className="btn btn-warning" onClick={() => onSave?.(pokemon)}>
              + Add to Favourites
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PokeCard;