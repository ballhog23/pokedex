export function cleanInput(input: string): string[] {
    return input.toLowerCase().match(/\w+/gim) || [];
}