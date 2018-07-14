const TMDB_IMAGE_BASE_URL = (width = 300) =>
  `http://172.24.16.147:3001/image`;

export const updateMoviePictureUrls = (movieResult, width = 300) => {
  if (movieResult) {
    return {
      ...movieResult,
      backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${
        movieResult.backdrop_path
      }`,
      poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.poster_path}`
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
