import { HOST_IP } from "../../common/constant.js";

const MOVIE_DB_BASE_URL = "http://" + HOST_IP + ":3001/image";

export const updateMoviePictureUrls = (movieResult, width = 300) => {
  if (movieResult) {
    return {
      ...movieResult,
      backdrop_path: `${MOVIE_DB_BASE_URL}${
        movieResult.backdrop_path
      }`,
      poster_path: `${MOVIE_DB_BASE_URL}${movieResult.poster_path}`
    };
  }
  return {};
};

export const getMoviesList = moviesResponse => {
  return !!moviesResponse
    ? [
        ...moviesResponse.results.map(movieResult =>
          updateMoviePictureUrls(movieResult)
        )
      ]
    : null;
};
