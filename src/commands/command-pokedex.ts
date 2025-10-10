import type { State } from "./state.js";

export async function commandPokedex(state: State) {
    const { caughtPokemon } = state;

    const pokedex = Object.values(caughtPokemon);

    if (!pokedex.length) throw new Error("You have not captured any pokemon, go catch 'em all!");

    console.log('Your Pokedex:');
    for (const pokemon of pokedex) {
        const { name } = pokemon;

        console.log(`  - ${name}`);
    }
}