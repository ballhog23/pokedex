import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log('Welcome to the Pokedex!\n');
    console.log('Usage:');

    for (const command of Object.values(commands)) {
        console.log(`${command.name}: `, command.description)
    }

    console.log() // formatting, adds line spacing...
}