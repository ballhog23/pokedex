import type { State } from "./state.js";

export function commandHelp(state: State) {
    console.log('Welcome to the Pokedex!\n');
    console.log('Usage:');
    const commandRegistry = state.commandRegistry;

    for (const command of Object.values(commandRegistry)) {
        console.log(`${command.name}: `, command.description)
    }

    console.log();
}