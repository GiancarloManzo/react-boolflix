import { useState } from "react";
import { searchMovies, searchTv } from "./api/tmdb";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch(text) {
    const q = text.trim();
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
        setItems([...movies, ...tvs]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-vh-100 bg-black text-light">
      <header className="border-bottom border-secondary">
        <div className="container py-4 d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
          <h1 className="m-0 text-danger fw-bold">BOOLFLIX</h1>
          <div style={{ width: "100%", maxWidth: 560 }}>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </header>

      <main className="container py-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <ResultsList items={items} />
      </main>
    </div>
  );
}
