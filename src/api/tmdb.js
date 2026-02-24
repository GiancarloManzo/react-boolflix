const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function buildUrl(path, query) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("query", query);
  url.searchParams.set("language", "it-IT");
  return url.toString();
}

export function searchMovies(query) {
  const url = buildUrl("/search/movie", query);
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Errore TMDB (movie)");
    return res.json();
  });
}

export function searchTv(query) {
  const url = buildUrl("/search/tv", query);
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Errore TMDB (tv)");
    return res.json();
  });
}
