import type { Interface } from "node:readline"
import { createInterface } from "node:readline"
import { stdin, stdout } from 'node:process';
import { getCommands } from "./commands.js";

export type State = {
    readline: Interface,
    commandRegistry: CommandRegistry
}

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => void;
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
    }

    return state;
}