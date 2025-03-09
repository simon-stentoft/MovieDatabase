//import fetch from "node-fetch";

async function fetchNowPlayingData() {
  const URL = "http://localhost:3000/now-playing"; // Fetch from Express
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const nowPlaying = data.results;
    console.log(nowPlaying);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchNowPlayingData();
