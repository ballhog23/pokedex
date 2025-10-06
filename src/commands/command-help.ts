import type { CLICommand } from "./commands";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log('Welcome to the Pokedex!\nUsage:');

    for (const [key, value] of Object.entries(commands)) {
        console.log(`${value.name}: `, value.description)
    }
}