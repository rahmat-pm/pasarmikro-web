// Constants should be in UPPERCASE_SNAKE_CASE
const API_TOKEN = "aaa";
const API_URL = "https://script.google.com/macros/s/AKfycbzmzrkmnH4zJ5tuD5OAUImxsKpAqLVCKzlzCg8QX9hpj8FwJInEC8IzFsbV0Fw_Amcz2g/exec";

// Use async/await for more readable asynchronous code
async function httpGetPromises(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle errors in a centralized way or rethrow them
    throw error;
  }
}