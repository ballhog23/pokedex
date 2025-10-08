import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

// test cases are described in each array as objects that match 
test.concurrent.each([
    {
        key: "https://example.com",
        val: 'test data',
        interval: 500 // 0.5s
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000, // 1 second
    }
])("test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    // test if the value is found in cache
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    // test if value has been reaped from cache (not present)
    // add N ms to interval to ensure that the reap loop has run and removed data from cache
    // this test can be buggy, sometimes the loop hasn't executed therefore the data is still present in the cache
    await new Promise((resolve) => setTimeout(resolve, interval + 3000));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
})