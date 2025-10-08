import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        console.log(`usage: explore <location-name>`);
        return;
    }
    const { pokeApi } = state;
    const locationString = args[0];

    const location = await pokeApi.fetchLocation(locationString);
    const pokemonEncounters = location.pokemon_encounters;

    for (const encouter of pokemonEncounters) {
        const name = encouter.pokemon.name;
        console.log(`- ${name}`)
    }
}