const API_KEY = "fb2d0289f8dc444a9994209489018bba";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovieData(endpoint) {
  // Map our endpoints to TMDb's API endpoints
  const endpointMap = {
    'now-playing': 'movie/now_playing',
    'popular': 'movie/popular',
    'top-rated': 'movie/top_rated',
    'upcoming': 'movie/upcoming'
  };

  const apiEndpoint = endpointMap[endpoint];
  const URL = `${BASE_URL}/${apiEndpoint}?api_key=${API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const movies = data.results;
    console.log(movies);
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerText = ""; // Clear the existing content

  movies.forEach((movie) => {
    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");

    // Header with the title
    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.innerText = movie.original_title;
    header.appendChild(title);

    // Image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const image = document.createElement("img");
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://via.placeholder.com/200x200?text=No+Image";
    image.src = imageUrl;
    image.alt = `${movie.original_title} Poster`;
    imageContainer.appendChild(image);

    // Text container for p tags
    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    // Description
    const description = document.createElement("p");
    description.classList.add("description");
    description.innerText = movie.overview;

    // Original Title
    const originalTitle = document.createElement("p");
    originalTitle.classList.add("original-title");
    const titleText = document.createElement("span");
    titleText.innerText = "Original Title: ";
    originalTitle.appendChild(titleText);
    const movieTitleText = document.createTextNode(`${movie.original_title}`);
    originalTitle.appendChild(movieTitleText);

    // Release Date
    const releaseDate = document.createElement("p");
    releaseDate.classList.add("release-date");
    const releaseDateText = document.createElement("span");
    releaseDateText.innerText = "Release Date: ";
    releaseDate.appendChild(releaseDateText);
    const movieReleaseDateText = document.createTextNode(
      `${movie.release_date}`
    );
    releaseDate.appendChild(movieReleaseDateText);

    // Append p tags to text container
    textContainer.appendChild(description);
    textContainer.appendChild(originalTitle);
    textContainer.appendChild(releaseDate);

    // Assemble card
    movieCard.appendChild(header);
    movieCard.appendChild(imageContainer);
    movieCard.appendChild(textContainer);

    movieList.appendChild(movieCard);
  });
}
