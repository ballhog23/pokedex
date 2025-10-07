import { State } from "./state.js";

export async function commandMap(state: State) {
    const { pokeApi } = state;
    let url = null;
    let locationsAreas = null;

    if (state.nextLocationURL) {
        url = state.nextLocationURL;
        locationsAreas = await pokeApi.fetchLocations(url);

    } else {
        locationsAreas = await pokeApi.fetchLocations();
    }

    if (locationsAreas.previous !== null) {
        state.previousLocationURL = locationsAreas.previous;
    } else {
        console.log('0 previous location-areas to fetch');
    }

    if (locationsAreas.next !== null) {
        state.nextLocationURL = locationsAreas.next
    } else {
        console.log('0 next location-areas to fetch');
    }

    const locations = locationsAreas.results;
    for (const location of locations) {
        console.log(location.name);
    }
    state.readline.prompt()
}