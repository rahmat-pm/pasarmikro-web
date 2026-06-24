// Constants should be in UPPERCASE_SNAKE_CASE
const API_TOKEN = "yOa00Z5MYOZQznQG1O5Dhe8ivtvzmJNImFKnVgs1cWuB8uIaAf9VofWX1eaxZHBQ";
const API_URL = "https://script.google.com/macros/s/AKfycbzmzrkmnH4zJ5tuD5OAUImxsKpAqLVCKzlzCg8QX9hpj8FwJInEC8IzFsbV0Fw_Amcz2g/exec";

const CACHE_PREFIX = "pm_";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

function getFromCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch (_) {
    return null;
  }
}

function setToCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch (_) {}
}

// Use async/await for more readable asynchronous code
async function httpGetPromises(url, options = {}) {
  const cacheKey = url;

  if (!options.skipCache) {
    const cached = getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!options.skipCache) {
      setToCache(cacheKey, data);
    }

    return data;
  } catch (error) {
    // Handle errors in a centralized way or rethrow them
    throw error;
  }
}