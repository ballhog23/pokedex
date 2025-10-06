export type Command = 'exit' | 'help';
export type CLICommand = {
    name: string,
    description: string,
    callback: (commands: Record<string, CLICommand>) => void;
}