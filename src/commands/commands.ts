import type { CLICommand, CommandRegistry } from "./state.js";
import { commandExit } from "./command-exit.js";
import { commandHelp } from "./command-help.js";
import { commandMap, commandMapB } from "./command-map.js";
import { commandExplore } from "./command-explore.js";

export function getCommands(): CommandRegistry {
    return {
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp
        },
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: commandExit
        },
        map: {
            name: 'map',
            description: 'get next list of poke areas',
            callback: commandMap
        },
        mapb: {
            name: 'mapb',
            description: 'get previous list of poke areas',
            callback: commandMapB
        },
        explore: {
            name: 'explore',
            description: 'explore area',
            callback: commandExplore
        },
    }
}