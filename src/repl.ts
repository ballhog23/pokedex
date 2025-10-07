import type { State } from "./commands/state.js";
import { getCommands } from "./commands/commands.js";

export function startREPL(state: State) {
    const rl = state.readline;
    rl.prompt();

    rl.on('line', (line) => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }

        const commandRegistry = state.commandRegistry;
        const commandName = input[0];
        const command = commandRegistry[commandName];

        if (!command) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }
        command.callback(state);
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().match(/\w+/gim) || [];
}