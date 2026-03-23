import { useState } from "react";
import battle, { type Team, type Poke } from "../controllers/battle.tsx";

type Winner = "A" | "B" | null;

function cloneTeam(t: Team): Team {
  return {
    name: t.name,
    i: t.i,
    pokemons: t.pokemons.map(p => ({ ...p })),
  };
}

function activePokemon(t: Team): Poke | undefined {
  return t.pokemons[t.i];
}
function alive(t: Team): boolean {
  return t.i < t.pokemons.length;
}
function dmg(a: Poke, d: Poke) {
  return Math.max(1, a.atk - Math.floor(d.def / 2));
}

// single attack + a string to show in the UI log
function hitWithLog(att: Team, def: Team): string {
  const A = activePokemon(att);
  const D = activePokemon(def);
  if (!A || !D) return "No attack (one team has no active Pokémon).";

  const damage = dmg(A, D);
  D.hp -= damage;

  let msg = `${att.name}:${A.name} hits ${def.name}:${D.name} for ${damage} (HP -> ${D.hp})`;

  if (D.hp <= 0) {
    def.i++;
    const next = activePokemon(def);
    msg += next
      ? ` | ${def.name} sends out ${next.name}`
      : ` | ${def.name} has no Pokémon left`;
  }

  return msg;
}

function makeDemoTeams(): { teamA: Team; teamB: Team } {
  const teamA: Team = {
    name: "A",
    i: 0,
    pokemons: [
      { name: "Pika", hp: 20, atk: 8, def: 4, spd: 10 },
      { name: "Bulba", hp: 24, atk: 7, def: 6, spd: 7 },
      { name: "Char", hp: 22, atk: 9, def: 5, spd: 9 },
    ],
  };

  const teamB: Team = {
    name: "B",
    i: 0,
    pokemons: [
      { name: "Squirt", hp: 26, atk: 6, def: 8, spd: 6 },
      { name: "Eevee", hp: 21, atk: 7, def: 5, spd: 8 },
      { name: "Mew", hp: 18, atk: 10, def: 4, spd: 11 },
    ],
  };

  return { teamA, teamB };
}

function TeamPanel({ team }: { team: Team }) {
  const a = activePokemon(team);

  return (
    <div className="flex-1 border border-warning rounded-lg p-4 min-w-[280px]">
      <div className="flex items-baseline gap-2">
        <strong>Team {team.name}</strong>
        <span style={{ fontSize: 12, opacity: 0.7 }}>
          Active {Math.min(team.i + 1, team.pokemons.length)}/{team.pokemons.length}
        </span>
      </div>

      <div style={{ marginTop: 10 }}>
        {a ? (
          <>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{a.name}</div>
            <div>HP: {a.hp}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              ATK {a.atk} · DEF {a.def} · SPD {a.spd}
            </div>
          </>
        ) : (
          <div>No Pokémon left</div>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Roster</div>
        <ul style={{ margin: 6, paddingLeft: 18 }}>
          {team.pokemons.map((p, idx) => {
            const isActive = idx === team.i;
            const fainted = p.hp <= 0;
            return (
              <li key={p.name} style={{ opacity: fainted ? 0.45 : 1 }}>
                <span style={{ fontWeight: isActive ? 700 : 400 }}>
                  {p.name} (HP {p.hp})
                </span>
                {isActive ? " ← active" : ""}
                {fainted ? " (KO)" : ""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function BattlePage() {
  // Create demo teams once using lazy initializers (no useMemo needed)
  const [teamA, setTeamA] = useState<Team>(() => cloneTeam(makeDemoTeams().teamA));
  const [teamB, setTeamB] = useState<Team>(() => cloneTeam(makeDemoTeams().teamB));

  const [winner, setWinner] = useState<Winner>(null);
  const [log, setLog] = useState<string[]>([]);

  function recomputeWinner(a: Team, b: Team): Winner {
    if (!alive(a)) return "B";
    if (!alive(b)) return "A";
    return null;
  }

  // One attack per click (simple for UI)
  function nextAttack() {
    if (winner) return;

    const a = cloneTeam(teamA);
    const b = cloneTeam(teamB);

    if (!alive(a) || !alive(b)) {
      setWinner(recomputeWinner(a, b));
      return;
    }

    const A = activePokemon(a)!;
    const B = activePokemon(b)!;

    // faster attacks first (ties: Team A first)
    const msg = A.spd >= B.spd ? hitWithLog(a, b) : hitWithLog(b, a);

    setTeamA(a);
    setTeamB(b);
    setWinner(recomputeWinner(a, b));
    setLog(prev => [msg, ...prev]);
  }

  // Finish the whole battle using your existing battle(teamA, teamB)
  function autoFinish() {
    if (winner) return;

    const a = cloneTeam(teamA);
    const b = cloneTeam(teamB);

    const w = battle(a, b); // mutates copies
    setTeamA(a);
    setTeamB(b);
    setWinner(w);
    setLog(prev => [`Auto-finished. Winner: Team ${w}`, ...prev]);
  }

  function reset() {
    const demo = makeDemoTeams();
    setTeamA(cloneTeam(demo.teamA));
    setTeamB(cloneTeam(demo.teamB));
    setWinner(null);
    setLog([]);
  }

  return (
    <div style={{ padding: 16, maxWidth: 980, margin: "0 auto" }} className="BattlePage">
      <h2 className="text-4xl text-warning text-center font-bold mb-10 ">Pokémon Battle</h2>

      <div style={winner ? { backgroundColor: "lightgreen" } : {}}className="text-center text-lg mb-6 border border-warning rounded-lg p-4">
        <strong>Status:</strong> {winner ? `Winner is Team ${winner}` : "In progress"}
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "space-between" }}>
        <TeamPanel team={teamA} />
        <TeamPanel team={teamB} />
      </div>

      <div className="mt-8 flex gap-4 justify-center border-t border-warning pt-6">
        <button className="border-2 border-warning shadow-md bg-warning text-white hover:bg-warning-dark" onClick={nextAttack} disabled={!!winner}>
          Next attack
        </button>
        <button className="border-2 border-warning shadow-md bg-warning text-white hover:bg-warning-dark" onClick={reset}>
          Restart
        </button>
      </div>

      <div className="mt-8 border-t shadow-md p-4 rounded-lg border-warning">
        <div className="text-sm text-muted" style={{ fontSize: 12, opacity: 0.7 }}>
          Log (newest first)
        </div>
        <ol style={{ marginTop: 6 }}>
          {log.slice(0, 12).map((line, idx) => (
            <li key={idx} className="font-mono text-sm mb-1 px-2 py-1 bg-gray-100 rounded">
              {line}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}