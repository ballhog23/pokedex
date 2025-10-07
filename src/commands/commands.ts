import type { State, CLICommand, CommandRegistry } from "./state.js";
import { commandExit } from "./command-exit.js";
import { commandHelp } from "./command-help.js";
import { commandMap } from "./command-map.js";
import { commandMapB } from "./command-mapb.js";

export function getCommands(): CommandRegistry {
    return {
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: async (state) => commandHelp(state)
        } satisfies CLICommand,
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: async (state) => commandExit(state)
        } satisfies CLICommand,
        map: {
            name: 'map',
            description: 'get next list of poke areas',
            callback: async (state) => commandMap(state)
        } satisfies CLICommand,
        mapb: {
            name: 'mapb',
            description: 'get previous list of poke areas',
            callback: async (state) => commandMapB(state)
        } satisfies CLICommand,
    }
}