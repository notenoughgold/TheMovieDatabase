import { API_KEY } from "./apikey";
const baseUrl = "https://api.themoviedb.org/3/";

async function fetchPopularMoviesAsync(page) {
  console.log("Repository.fetchPopularMovie");
  try {
    const response = await fetch(
      baseUrl + `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

async function fetchMovieDetailsAsync(movieId) {
  console.log("Repository.fetchMovieDetailsAsync");
  try {
    const response = await fetch(
      baseUrl +
        `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchPeopleDetailsAsync(peopleId) {
  console.log("Repository.fetchPeopleDetailsAsync");
  try {
    const response = await fetch(
      baseUrl +
        `person/${peopleId}?api_key=${API_KEY}&language=en-US&append_to_response=movie_credits`
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function getImageLink(link, width) {
  var url = `https://image.tmdb.org/t/p/w${width}${link}`;
  return url;
}

export {
  fetchPopularMoviesAsync,
  getImageLink,
  fetchMovieDetailsAsync,
  fetchPeopleDetailsAsync
};
