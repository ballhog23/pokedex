import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './commands/commands.js';

export function startREPL() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex > ',
        terminal: true,
    });

    rl.prompt();

    rl.on('line', (line) => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = input[0];
        const commands = getCommands();
        const command = commands[commandName];
        if (!command) {
            console.log(
                `Unknown command: "${commandName}". Type "help" for a list of commands.`,
            );
            rl.prompt();
            return;
        }

        try {
            command.callback(commands);
        } catch (error) {
            console.log(error)
        }

        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().match(/\w+/gim) || [];
}