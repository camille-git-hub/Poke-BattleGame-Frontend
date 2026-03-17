export const Home = () => {

const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSavePokemon = (poke: Pokemon) => {
    savePokemon(poke);
    setPokemon(prev => prev.map(p => p.id === poke.id ? {...p, saved: true} : p));
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4 text-center mt-4">Pokemon Battleground</h1>
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

