
type Poke = { name: string; hp: number; atk: number; def: number; spd: number };
type Team = { name: string; pokemons: Poke[]; i: number }; // i = active pokemon index

const dmg = (a: Poke, d: Poke) => Math.max(1, a.atk - Math.floor(d.def / 2));
const active = (t: Team) => t.pokemons[t.i];
const alive = (t: Team) => t.i < t.pokemons.length;
function hit(att: Team, def: Team) {
  const A = active(att);
  const D = active(def);
  if (A && D) {
    D.hp -= dmg(A, D);
    if (D.hp <= 0) def.i++;
  }
}

export function battle(teamA: Team, teamB: Team): "A" | "B" {
  while (alive(teamA) && alive(teamB)) {
    const A = active(teamA);
    const B = active(teamB);

    if (A && B && A.spd >= B.spd) {
      hit(teamA, teamB);
      if (alive(teamB)) hit(teamB, teamA); 
    } else {
      hit(teamB, teamA);
      if (alive(teamA)) hit(teamA, teamB);
    }
  }
  return alive(teamA) ? "A" : "B";
}

// Example:
const A: Team = { name: "A", i: 0, pokemons: [
  { name: "Pika", hp: 20, atk: 8, def: 4, spd: 10 },
  { name: "Bulba", hp: 24, atk: 7, def: 6, spd: 7 },
  { name: "Char", hp: 22, atk: 9, def: 5, spd: 9 },
]};

const B: Team = { name: "B", i: 0, pokemons: [
  { name: "Squirt", hp: 26, atk: 6, def: 8, spd: 6 },
  { name: "Eevee", hp: 21, atk: 7, def: 5, spd: 8 },
  { name: "Mew", hp: 18, atk: 10, def: 4, spd: 11 },
]};

console.log("Winner:", battle(A, B));

export default battle;

export type { Team, Poke };