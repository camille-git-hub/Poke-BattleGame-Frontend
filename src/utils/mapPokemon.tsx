import type { Pokemon } from "../types/Pokemon";

export function mapPokeApiToPokemon(api: any): Pokemon {
  const stat = (name: string) =>
    api.stats?.find((s: any) => s.stat?.name === name)?.base_stat ?? 0;

  return {
    id: api.id,
    name: api.name,
    image:
      api.sprites?.other?.["official-artwork"]?.front_default ??
      api.sprites?.front_default ??
      "",
    stats: {
      hp: stat("hp"),
      attack: stat("attack"),
      defense: stat("defense"),
      speed: stat("speed"),
    },
    isSaved: false,
  };
}