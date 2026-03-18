export const PokeCard = () => {
  return (
    <div className="poke-card">
      <h2>Pokemon Name</h2>
      <img src="pokemon-image-url" alt="Pokemon" />
        <p>Type: Pokemon Type</p>
        <p>HP: Pokemon HP</p>
        <p>Attack: Pokemon Attack</p>
        <p>Defense: Pokemon Defense</p>
        <button className="save-button">Save to Roster</button>
    </div>
  );
};

export default PokeCard;