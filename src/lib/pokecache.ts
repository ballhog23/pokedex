export class Cache {
    #cache: CacheMap = new Map();
    #reapIntervalId: ReapIntervalId = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, value: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: value
        }

        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        const entry = this.#cache.get(key);
        return entry ? entry.val as T : undefined;
    }

    #reap() {
        /**
         * You could also write the math as 
         * const now = Date.now();
         * if (now - entry.createdAt > this.#interval) delete from cache;
         * if the time from now minus the time the resource was fetched is greater than the interval we cache, delete 
         */
        const cutOff = Date.now() - this.#interval;

        for (const [key, entry] of this.#cache) {
            const { createdAt } = entry;

            if (createdAt < cutOff) this.#cache.delete(key);
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}

export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export type CacheMap = Map<string, CacheEntry<any>>;

export type ReapIntervalId = NodeJS.Timeout | undefined;