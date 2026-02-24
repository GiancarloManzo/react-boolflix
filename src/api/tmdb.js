const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_SEARCH = `${BASE_URL}/search/movie`;
const TV_SEARCH = `${BASE_URL}/search/tv`;

function buildUrl(url, query) {
  const q = query.trim();
  return `${url}?api_key=${API_KEY}&query=${encodeURIComponent(q)}&language=it-IT`;
}

export function searchMovies(query) {
  return fetch(buildUrl(MOVIE_SEARCH, query))
    .then((res) => {
      if (!res.ok) throw new Error("Errore chiamata TMDB (movie)");
      return res.json();
    })
    .then((data) => data.results || []);
}

export function searchTv(query) {
  return fetch(buildUrl(TV_SEARCH, query))
    .then((res) => {
      if (!res.ok) throw new Error("Errore chiamata TMDB (tv)");
      return res.json();
    })
    .then((data) => data.results || []);
}

export function hasApiKey() {
  return Boolean(API_KEY);
}
