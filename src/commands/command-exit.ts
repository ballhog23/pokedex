import type { State } from "./state.js";

export async function commandExit(state: State) {
    const rl = state.readline;
    console.log('Closing the Pokedex... Goodbye!');
    rl.close();
    process.exit(0)
}