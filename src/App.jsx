import { useState } from "react";
import { searchMovies, searchTv } from "./api/tmdb";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError("");

    Promise.all([searchMovies(q), searchTv(q)])
      .then(([movieData, tvData]) => {
        const movies = movieData.results.map((m) => ({
          ...m,
          media_type: "movie",
        }));
        const tvs = tvData.results.map((t) => ({ ...t, media_type: "tv" }));
        setResults([...movies, ...tvs]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>BoolFlix</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un film o una serie..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 12px" }}>
          Cerca
        </button>
      </div>

      {loading && <p>Caricamento...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((item) => (
          <li key={`${item.media_type}-${item.id}`}>
            {item.media_type === "tv" ? item.name : item.title} (
            {item.media_type})
          </li>
        ))}
      </ul>
    </div>
  );
}
