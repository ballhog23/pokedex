import type { Pokemon, ShallowLocations, Location } from "./pokeapi-types.js";
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
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.cache.get<Location>(url);
        if (cached) {
            console.log(`returning location from cache: ${url}`)
        }

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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached = this.cache.get<Pokemon>(url);
        if (cached) return cached;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }

            const pokemon: Pokemon = await res.json();
            this.cache.add(url, pokemon);
            return pokemon;

        } catch (err) {
            throw new Error(`Error fetching pokemon '${pokemonName}': ${err instanceof Error ? err.message : err}`)
        }
    }
}


