import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ResultsList from "./components/ResultsList";
import { hasApiKey, searchMovies, searchTv } from "./api/tmdb";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    if (activeTab === "all") return results;
    return results.filter((x) => x.media_type === activeTab);
  }, [results, activeTab]);

  const onSearch = () => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setError("");
      return;
    }

    if (!hasApiKey()) {
      setError(
        "Manca la API key TMDB. Controlla il file .env (VITE_TMDB_API_KEY).",
      );
      return;
    }

    setLoading(true);
    setError("");

    Promise.all([searchMovies(q), searchTv(q)])
      .then(([movies, tvs]) => {
        const moviesWithType = movies.map((m) => ({
          ...m,
          media_type: "movie",
        }));
        const tvWithType = tvs.map((t) => ({ ...t, media_type: "tv" }));
        setResults([...moviesWithType, ...tvWithType]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container nf-page">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="m-0">Risultati</h4>
          <span className="text-secondary small">
            {loading ? "Caricamento..." : `${filtered.length} items`}
          </span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <ResultsList items={loading ? [] : filtered} />
      </main>
    </>
  );
}
