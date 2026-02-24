// src/components/ResultsList.jsx
import MediaCard from "./MediaCard";

export default function ResultsList({
  results = [],
  loading = false,
  error = "",
  query = "",
  title = "",
}) {
  const hasQuery = query.trim().length > 0;
  const hasResults = Array.isArray(results) && results.length > 0;

  const styles = {
    wrapper: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "18px 16px 40px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 12,
      marginBottom: 14,
    },
    h2: {
      margin: 0,
      color: "rgba(255,255,255,.95)",
      fontSize: 18,
      fontWeight: 800,
    },
    count: {
      color: "rgba(255,255,255,.65)",
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: "nowrap",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 18,
    },
    message: {
      color: "rgba(255,255,255,.80)",
      background: "rgba(255,255,255,.04)",
      border: "1px solid rgba(255,255,255,.10)",
      borderRadius: 14,
      padding: 16,
      lineHeight: 1.4,
    },
    error: {
      color: "rgba(255,255,255,.90)",
      background: "rgba(255,0,0,.06)",
      border: "1px solid rgba(255,0,0,.25)",
      borderRadius: 14,
      padding: 16,
      lineHeight: 1.4,
    },
  };

  const effectiveTitle =
    title || (hasQuery ? `Risultati per “${query}”` : "Boolflix");

  return (
    <section style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.h2}>{effectiveTitle}</h2>

        {hasQuery && !loading && !error && (
          <div style={styles.count}>
            {hasResults ? `${results.length} risultati` : "0 risultati"}
          </div>
        )}
      </div>

      {error && (
        <div style={styles.error}>
          <strong>Errore:</strong> {error}
        </div>
      )}

      {!error && loading && <div style={styles.message}>Caricamento...</div>}

      {!error && !loading && !hasQuery && (
        <div style={styles.message}>
          Cerca un <strong>film</strong> o una <strong>serie TV</strong> dalla
          barra di ricerca.
        </div>
      )}

      {!error && !loading && hasQuery && !hasResults && (
        <div style={styles.message}>
          Nessun risultato per <strong>“{query}”</strong>.
        </div>
      )}

      {!error && !loading && hasResults && (
        <div style={styles.grid}>
          {results.map((item) => (
            <MediaCard
              key={`${item.media_type || "x"}-${item.id}`}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}
