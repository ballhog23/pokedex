import type { CommandRegistry } from "./command.js"
import type { Interface } from "node:readline"
import { createInterface } from "node:readline"
import { stdin, stdout } from 'node:process';
import { getCommands } from "./commands.js";

export type State = {
    readline: Interface,
    commandRegistry: CommandRegistry
}

export function initState() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex > ',
        terminal: true,
    });

    const state: State = {
        readline: rl,
        commandRegistry: getCommands(),
    }

    return state;
}