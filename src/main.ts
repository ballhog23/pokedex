import { startREPL } from "./repl.js";
import { initState } from "./commands/state.js";

function main() {
    const cacheInterval = 1000 * 60 * 5; // 5 minutes
    const init = initState(cacheInterval);
    startREPL(init);
}

main();