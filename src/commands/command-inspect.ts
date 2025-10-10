import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length != 1) {
        throw new Error('usage: inspect <pokemon_name>');
    }

    const pokemonName = args[0];
    const { caughtPokemon } = state;
    const notCaught = !(pokemonName in caughtPokemon);

    if (notCaught) {
        throw new Error(`You have not captured ${pokemonName}`);
    }

    const { height, weight, stats, types } = caughtPokemon[pokemonName];
    console.log(`Name: ${pokemonName}`);
    console.log(`Height: ${height}`);
    console.log(`Weight: ${weight}`);
    console.log(`Stats:`);
    for (const stat of stats) {
        console.log(`  - ${stat.stat.name}: ${stat.base_stat}`)
    }
    console.log(`Types:`);
    for (const type of types) {
        console.log(`  - ${type.type.name}`)
    }
}