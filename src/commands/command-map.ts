import type { State } from "./state.js";

export async function commandMap(state: State) {
    const { pokeApi } = state;
    const locationsAreas = await pokeApi.fetchLocations(state.nextLocationURL);

    if (!locationsAreas) {
        throw new Error("you're on the last page");
    }

    state.nextLocationURL = locationsAreas.next;
    state.previousLocationURL = locationsAreas.previous;

    const locations = locationsAreas.results;
    for (const location of locations) {
        console.log(location.name);
    }
}

export async function commandMapB(state: State) {
    if (!state.previousLocationURL) {
        throw new Error("you're on the first page");
    }

    const { pokeApi } = state;
    const locationsAreas = await pokeApi.fetchLocations(state.previousLocationURL);

    if (!locationsAreas) {
        throw new Error('Error fetching previous locations');
    }

    state.nextLocationURL = locationsAreas.next;
    state.previousLocationURL = locationsAreas.previous;

    const locations = locationsAreas.results;
    for (const location of locations) {
        console.log(location.name)
    }
}