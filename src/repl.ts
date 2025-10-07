import type { State } from "./commands/state.js";

export function startREPL(state: State) {
    const rl = state.readline;
    rl.prompt();

    rl.on('line', async (line) => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = input[0];
        const commandRegistry = state.commandRegistry;
        const command = commandRegistry[commandName];

        if (!command) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }

        try {
            command.callback(state);
        } catch (error) {
            console.log(error)
        }

        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().match(/\w+/gim) || [];
}