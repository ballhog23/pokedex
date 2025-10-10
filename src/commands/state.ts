import type { Interface } from "node:readline"
import { createInterface } from "node:readline"
import { stdin, stdout } from 'node:process';
import { getCommands } from "./commands.js";
import { PokeAPI } from "../lib/pokeapi.js";
import { Pokemon } from "src/lib/pokeapi-types.js";

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type CommandRegistry = Record<string, CLICommand>;

export type State = {
    readline: Interface,
    commandRegistry: CommandRegistry,
    pokeApi: PokeAPI,
    nextLocationURL: string,
    previousLocationURL: string,
    caughtPokemon: Record<string, Pokemon>
}

export function initState(cacheInterval: number) {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex > ',
        terminal: true,
        historySize: 100,
    });

    const state: State = {
        readline: rl,
        commandRegistry: getCommands(),
        pokeApi: new PokeAPI(cacheInterval),
        nextLocationURL: '',
        previousLocationURL: '',
        caughtPokemon: {}
    }

    return state;
}