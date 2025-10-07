import type { CLICommand, CommandRegistry } from "./command.js";
import { commandExit } from "./command-exit.js";
import { commandHelp } from "./command-help.js";

export function getCommands(): CommandRegistry {
    return {
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: (state) => commandHelp(state)
        } satisfies CLICommand,
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: (state) => commandExit(state)
        } satisfies CLICommand,
    }
}