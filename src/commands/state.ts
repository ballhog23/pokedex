import type { Interface } from "node:readline"
import { createInterface } from "node:readline"
import { stdin, stdout } from 'node:process';
import { getCommands } from "./commands.js";
import { PokeAPI } from "../lib/pokeapi.js";

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => Promise<void>;
}

export type CommandRegistry = Record<string, CLICommand>;

export type State = {
    readline: Interface,
    commandRegistry: CommandRegistry,
    pokeApi: PokeAPI,
    nextLocationURL: string,
    previousLocationURL: string,
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
        previousLocationURL: ''
    }

    return state;
}