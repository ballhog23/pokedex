import type { Interface } from "node:readline"
import type { NamedAPIResourceList } from '../lib/pokeapi.js';
import { createInterface } from "node:readline"
import { stdin, stdout } from 'node:process';
import { getCommands } from "./commands.js";
import { PokeAPI } from "../lib/pokeapi.js";

export type State = {
    readline: Interface,
    commandRegistry: CommandRegistry,
    pokeApi: PokeAPI,
    nextLocationURL: string,
    previousLocationURL: string,
}

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => Promise<void>;
}

export type CommandRegistry = Record<string, CLICommand>;

export function initState() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex > ',
    });

    const state: State = {
        readline: rl,
        commandRegistry: getCommands(),
        pokeApi: new PokeAPI(),
        nextLocationURL: '',
        previousLocationURL: ''
    }

    return state;
}