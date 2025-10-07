import type { CLICommand } from "./command.js";
import type { State } from "./state.js";

export function commandHelp(state: State) {
    console.log('Welcome to the Pokedex!\n');
    console.log('Usage:');
    const commands = state.commandRegistry;

    for (const command of Object.values(commands)) {
        console.log(`${command.name}: `, command.description)
    }

    console.log() // formatting, adds line spacing...
}