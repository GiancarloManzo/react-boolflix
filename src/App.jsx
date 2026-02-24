// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import ResultsList from "./components/ResultsList";
import { hasApiKey, searchMovies, searchTv } from "./api/tmdb";

export default function App() {
  const [input, setInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(""); // query "ufficiale" dopo submit
  const [activeTab, setActiveTab] = useState("all"); // all | movie | tv

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiReady = hasApiKey();

  const canShowTabs = submittedQuery.trim().length > 0; // tab SOLO dopo ricerca

  const tabLabel = useMemo(() => {
    if (activeTab === "movie") return "Film";
    if (activeTab === "tv") return "Serie TV";
    return "Tutto";
  }, [activeTab]);

  function handleSubmit(e) {
    e.preventDefault();

    const q = input.trim();
    if (!q) return;

    // Quando cerchi, non resetto i tab: se eri su "Film" resti su "Film"
    setSubmittedQuery(q);
  }

  function clearSearch() {
    setInput("");
    setSubmittedQuery("");
    setActiveTab("all");
    setResults([]);
    setError("");
    setLoading(false);
  }

  useEffect(() => {
    // Se non ho API key, non faccio nulla
    if (!apiReady) return;

    // Se non c’è una ricerca "confermata", non fetchare
    const q = submittedQuery.trim();
    if (!q) return;

    setLoading(true);
    setError("");

    const run = async () => {
      try {
        if (activeTab === "movie") {
          const movies = await searchMovies(q);
          setResults(movies);
        } else if (activeTab === "tv") {
          const tv = await searchTv(q);
          setResults(tv);
        } else {
          // all = unisco film + serie
          const [movies, tv] = await Promise.all([
            searchMovies(q),
            searchTv(q),
          ]);
          // opzionale: ordino per "popolarità" se esiste, altrimenti lascio così
          const merged = [...movies, ...tv].sort((a, b) => {
            const pa = Number(a.popularity) || 0;
            const pb = Number(b.popularity) || 0;
            return pb - pa;
          });
          setResults(merged);
        }
      } catch (err) {
        setResults([]);
        setError(err?.message || "Errore durante la ricerca");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [apiReady, submittedQuery, activeTab]);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0b0b0b",
      color: "white",
    },
    topBar: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "rgba(11,11,11,.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(255,255,255,.08)",
    },
    topInner: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minWidth: 170,
    },
    logo: {
      width: 10,
      height: 22,
      borderRadius: 999,
      background: "#e50914",
      boxShadow: "0 0 0 2px rgba(229,9,20,.25)",
    },
    title: {
      margin: 0,
      fontSize: 18,
      fontWeight: 900,
      letterSpacing: 0.3,
    },
    form: {
      flex: 1,
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      width: "min(620px, 100%)",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,.14)",
      background: "rgba(255,255,255,.06)",
      color: "rgba(255,255,255,.92)",
      outline: "none",
      fontSize: 14,
    },
    btn: {
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,.14)",
      background: "rgba(255,255,255,.08)",
      color: "rgba(255,255,255,.92)",
      fontWeight: 700,
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    btnPrimary: {
      background: "#e50914",
      border: "1px solid rgba(229,9,20,.35)",
    },
    tabsWrap: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 16px 12px",
    },
    tabsRow: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    tabs: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
    },
    tab: (active) => ({
      padding: "8px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.14)",
      background: active ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.06)",
      color: "rgba(255,255,255,.92)",
      fontWeight: 800,
      cursor: "pointer",
      fontSize: 13,
    }),
    subInfo: {
      color: "rgba(255,255,255,.65)",
      fontSize: 13,
      fontWeight: 600,
    },
    keyBox: {
      maxWidth: 1200,
      margin: "18px auto 0",
      padding: "0 16px",
    },
    warn: {
      border: "1px solid rgba(255,193,7,.25)",
      background: "rgba(255,193,7,.08)",
      borderRadius: 14,
      padding: 16,
      color: "rgba(255,255,255,.9)",
      lineHeight: 1.4,
    },
  };

  return (
    <div style={styles.page}>
      <header style={styles.topBar}>
        <div style={styles.topInner}>
          <div style={styles.brand}>
            <div style={styles.logo} />
            <h1 style={styles.title}>Boolflix</h1>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cerca un film o una serie TV..."
              aria-label="Cerca"
            />

            <button
              type="submit"
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              Cerca
            </button>

            {canShowTabs && (
              <button type="button" onClick={clearSearch} style={styles.btn}>
                Home
              </button>
            )}
          </form>
        </div>

        {/* Tab SOLO dopo una ricerca (niente bottoni inutili prima) */}
        {canShowTabs && (
          <div style={styles.tabsWrap}>
            <div style={styles.tabsRow}>
              <div style={styles.tabs}>
                <button
                  type="button"
                  style={styles.tab(activeTab === "all")}
                  onClick={() => setActiveTab("all")}
                >
                  Tutto
                </button>
                <button
                  type="button"
                  style={styles.tab(activeTab === "movie")}
                  onClick={() => setActiveTab("movie")}
                >
                  Film
                </button>
                <button
                  type="button"
                  style={styles.tab(activeTab === "tv")}
                  onClick={() => setActiveTab("tv")}
                >
                  Serie
                </button>
              </div>

              <div style={styles.subInfo}>
                Filtro:{" "}
                <strong style={{ color: "rgba(255,255,255,.9)" }}>
                  {tabLabel}
                </strong>
              </div>
            </div>
          </div>
        )}
      </header>

      {!apiReady && (
        <div style={styles.keyBox}>
          <div style={styles.warn}>
            <strong>API key mancante.</strong> Controlla il tuo{" "}
            <code>.env</code> e la funzione <code>hasApiKey()</code> in{" "}
            <code>src/api/tmdb.js</code>.
          </div>
        </div>
      )}

      <main>
        <ResultsList
          results={results}
          loading={loading}
          error={error}
          query={submittedQuery}
          title={
            submittedQuery ? `Risultati per “${submittedQuery}”` : "Boolflix"
          }
        />
      </main>
    </div>
  );
}
