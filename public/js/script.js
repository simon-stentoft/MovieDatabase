//import fetch from "node-fetch";

async function fetchNowPlayingData(endpoint) {
  const URL = `http://localhost:3000/${endpoint}`; // Fetch from Express
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const nowPlaying = data.results;
    console.log(nowPlaying);
    displayMovies(nowPlaying);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
fetchNowPlayingData("now-playing");

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerText = ""; // Clear the existing content

  movies.forEach((movie) => {
    //New article for each movie
    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");

    //Header with the title
    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.innerText = movie.original_title;
    header.appendChild(title);

    //Poster image
    const image = document.createElement("img");
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/210x295?text=No+Image";
    image.src = imageUrl;
    image.alt = `${movie.original_title} Poster`;

    //Description
    const description = document.createElement("p");
    description.classList.add("description");
    description.innerText = movie.overview;

    //Title
    const originalTitle = document.createElement("p");
    originalTitle.classList.add("original-title");

    const titleText = document.createElement("span");
    titleText.innerText = "Original Title: ";
    originalTitle.appendChild(titleText);

    const movieTitleText = document.createTextNode(`${movie.original_title}`);

    originalTitle.appendChild(movieTitleText);

    //Release date
    const releaseDate = document.createElement("p");
    releaseDate.classList.add("release-date");

    const releaseDateText = document.createElement("span");
    releaseDateText.innerText = "Release Date: ";
    releaseDate.appendChild(releaseDateText);

    const movieReleaseDateText = document.createTextNode(
      `${movie.release_date}`
    );
    releaseDate.appendChild(movieReleaseDateText);

    //Assembling card
    movieCard.appendChild(header);
    movieCard.appendChild(image);
    movieCard.appendChild(description);
    movieCard.appendChild(originalTitle);
    movieCard.appendChild(releaseDate);

    movieList.appendChild(movieCard);
  });
}
