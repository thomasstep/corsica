const MOVIE_DB_BASE_URL = "http://172.24.16.147:3001";

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = MOVIE_DB_BASE_URL + relativeUrl;
  return baseUrl;
};

// WARNING: Must pass parameters like this: ({param1, param2})
// for async action creator helper to work
export const getTopMovies = async ({ page }) => {
  const fullUrl = createMovieDbUrl("/movie/topRated", {
    page
  });
  return fetch(fullUrl);
};

export const searchMovies = async ({ page, query }) => {
  const fullUrl = createMovieDbUrl("/search/movie", {
    page,
    query
  });
  return fetch(fullUrl);
};

export const getMovieDetails = async ({ movieId }) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl);
};
