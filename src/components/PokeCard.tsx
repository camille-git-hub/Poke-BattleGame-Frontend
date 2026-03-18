import type { Pokemon } from "../types/Pokemon.ts";

const PokeCard = ({ pokemons, onSave, mode }: { pokemons: Pokemon[], onSave?: (pokemon: Pokemon) => void; mode?: "search" | "gallery" | "featured" }) => {
    return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="border p-4 relative flex flex-col justify-between mb-6">
                <h3 className="text-lg font-bold">{pokemon.name}</h3>
                <p>{pokemon.type}</p>
                <img className="object-cover w-full h-48 mb-2" src={pokemon.image_url} alt={pokemon.name} />
                {mode === "search" ? (<button className="btn bg-gray-800 text-white hover:bg-gray-600" onClick={() => onSave?.(pokemon)}>{pokemon.saved ? "Added!" : "+ Add to Gallery"}</button>) : 
                (<button className="btn bg-gray-200 text-black hover:bg-red-400" onClick={() => onDelete?.(artwork.id)}>Remove from Gallery</button>)}
            </div>
        ))}
    </div>

)
}

export default PokeCard;