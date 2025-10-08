import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number) {
        this.cache = new Cache(interval);
    };

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        // check cache for locations requested
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {
            console.log('fetching locations from cache');
            return cached;
        }

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }

            const locations: ShallowLocations = await res.json();

            // adds locations to cache if not present
            console.log('adding locations to cache')
            this.cache.add(url, locations);

            return locations;

        } catch (err) {
            throw new Error(`Error: ${err instanceof Error ? err.message : err}`)
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location/${locationName}`;

        const cached = this.cache.get<Location>(url);
        if (cached) return cached;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error retrieving location: ${PokeAPI.baseURL}/location/${locationName}`);
            }

            const location: Location = await res.json();
            this.cache.add<Location>(url, location);
            return location;

        } catch (err) {
            throw new Error(`Error: ${err instanceof Error ? err.message : err}`)
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
