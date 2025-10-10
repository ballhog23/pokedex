import type { CommandRegistry } from "./state.js";
import { commandExit } from "./command-exit.js";
import { commandHelp } from "./command-help.js";
import { commandMap, commandMapB } from "./command-map.js";
import { commandExplore } from "./command-explore.js";
import { commandCatch } from "./command-catch.js";

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
            description: 'get the next list of areas',
            callback: commandMap
        },
        mapb: {
            name: 'mapb',
            description: 'get the previous list of areas',
            callback: commandMapB
        },
        explore: {
            name: 'explore <location-name>',
            description: 'explore an area',
            callback: commandExplore
        },
        catch: {
            name: 'catch <pokemon_name>',
            description: 'catch a pokemon',
            callback: commandCatch
        }
    }
}