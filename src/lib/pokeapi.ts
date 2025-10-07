export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {
    };

    async fetchLocations(pageURL?: string) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }

            const data: ShallowLocations = await res.json();

            return data;
        } catch (err) {
            console.log(`Error: ${err instanceof Error ? err.message : err}`);
        }
    }

    async fetchLocation(locationName: string) {
        const url = `${PokeAPI.baseURL}/location/${locationName}`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error retrieving location: ${PokeAPI.baseURL}/location/${locationName}`);
            }

            const data: Location = await res.json();

            return data;
        } catch (err) {
            console.log(`Error: ${err instanceof Error ? err.message : err}`);
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};
