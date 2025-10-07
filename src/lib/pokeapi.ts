export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {
    };

    async fetchLocations(pageURL?: string) {
        const options: RequestInit = {
            'method': "GET",
            'headers': {
                'User-Agent': 'pokedex'
            }
        }

        let url = null;

        if (pageURL) url = pageURL;
        else url = `${PokeAPI.baseURL}/location-area`;

        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error retrieving data from endpoint: ${PokeAPI.baseURL}/${pageURL}`);
        }

        const data: NamedAPIResourceList = await res.json();

        return data;
    }

    async fetchLocation(locationName: string) {
        const options: RequestInit = {
            'method': "GET",
            'headers': {
                'User-Agent': 'pokedex'
            }
        }

        const res = await fetch(`${PokeAPI.baseURL}/location/${locationName}`, options);

        if (!res.ok) {
            throw new Error(`Error retrieving location: ${PokeAPI.baseURL}/location/${locationName}`);
        }

        const data: NamedAPIResourceList = await res.json();

        return data;
    }
}

export type NamedAPIResourceList = {
    count: number,
    next: string | null,
    previous: string | null,
    results: NamedAPIRescource[]
}

export type NamedAPIRescource = {
    name: string,
    url: string
}