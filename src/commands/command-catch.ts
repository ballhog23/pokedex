import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        console.log(`usage: catch <pokemon_name>`);
        return;
    }

    const pokemonString = args[0];
    const { caughtPokemon, pokeApi } = state;

    console.log(`Throwing a Pokeball at ${pokemonString}...`);

    let pokemon = null;

    try {
        pokemon = await pokeApi.fetchPokemon(pokemonString);
    } catch (err) {
        console.log(`Failed to catch ${pokemonString}: ${err instanceof Error ? err.message : err}`);
        return;
    }

    if (pokemon.name in caughtPokemon) throw new Error("You've caught this Pokemon already, silly")

    const baseExperience = pokemon.base_experience;
    const captureChance = rng(1, baseExperience + 50);

    if (baseExperience < captureChance) {
        console.log(`${pokemonString} was caught!`);
        caughtPokemon[`${pokemonString}`] = pokemon;
        return;
    } else {
        console.log(`${pokemonString} escaped!`);
        return;
    }
}

function rng(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}