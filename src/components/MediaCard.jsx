// src/components/MediaCard.jsx
import { useMemo, useState } from "react";

export default function MediaCard({ item }) {
  const [hover, setHover] = useState(false);

  const {
    title,
    name,
    original_title,
    original_name,
    poster_path,
    vote_average,
    original_language,
    overview,
  } = item || {};

  const displayTitle = title || name || "Senza titolo";
  const originalTitle = original_title || original_name || "";
  const language = (original_language || "").toUpperCase();

  const posterUrl = useMemo(() => {
    if (!poster_path) return null;
    return `https://image.tmdb.org/t/p/w342${poster_path}`;
  }, [poster_path]);

  const stars = useMemo(() => {
    const v = Number(vote_average) || 0;
    const s = Math.round(v / 2); // 0..5
    return Math.min(5, Math.max(0, s));
  }, [vote_average]);

  const starText = "★".repeat(stars) + "☆".repeat(5 - stars);

  const styles = {
    card: {
      position: "relative",
      borderRadius: 14,
      overflow: "hidden",
      background: "#141414",
      boxShadow: hover
        ? "0 14px 35px rgba(0,0,0,.55)"
        : "0 10px 25px rgba(0,0,0,.35)",
      transform: hover
        ? "translateY(-4px) scale(1.02)"
        : "translateY(0) scale(1)",
      transition: "transform .18s ease, box-shadow .18s ease",
      cursor: "pointer",
      aspectRatio: "2 / 3",
    },
    poster: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      filter: hover ? "brightness(.78)" : "brightness(.95)",
      transition: "filter .18s ease",
    },
    noPoster: {
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
      color: "rgba(255,255,255,.65)",
      fontSize: 14,
      padding: 16,
      textAlign: "center",
      background:
        "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
    },

    // Titolo SEMPRE visibile (ma sparisce in hover)
    titleBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: "10px 12px",
      background:
        "linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.35), rgba(0,0,0,0))",
      opacity: hover ? 0 : 1,
      transition: "opacity .18s ease",
    },
    title: {
      margin: 0,
      color: "rgba(255,255,255,.95)",
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.25,
      textShadow: "0 2px 10px rgba(0,0,0,.65)",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },

    // Overlay SOLO in hover (testi non devono MAI sovrapporsi)
    overlay: {
      position: "absolute",
      inset: 0,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background:
        "linear-gradient(to top, rgba(0,0,0,.90), rgba(0,0,0,.35), rgba(0,0,0,.12))",
      opacity: hover ? 1 : 0,
      transition: "opacity .18s ease",
      pointerEvents: hover ? "auto" : "none",
    },
    metaRow: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      color: "rgba(255,255,255,.85)",
      fontSize: 12,
      lineHeight: 1.2,
    },
    pill: {
      border: "1px solid rgba(255,255,255,.18)",
      background: "rgba(0,0,0,.35)",
      padding: "3px 8px",
      borderRadius: 999,
    },
    originalRow: {
      margin: 0,
      color: "rgba(255,255,255,.85)",
      fontSize: 12,
      lineHeight: 1.35,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    overview: {
      margin: 0,
      color: "rgba(255,255,255,.82)",
      fontSize: 12,
      lineHeight: 1.35,
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
  };

  return (
    <article
      style={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={displayTitle}
      title={displayTitle}
    >
      {posterUrl ? (
        <img
          style={styles.poster}
          src={posterUrl}
          alt={displayTitle}
          loading="lazy"
        />
      ) : (
        <div style={styles.noPoster}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              {displayTitle}
            </div>
            <div>Nessun poster disponibile</div>
          </div>
        </div>
      )}

      {/* Overlay hover */}
      <div style={styles.overlay}>
        {/* 🔝 TOP (rating + lingua) */}
        <div style={styles.metaRow}>
          {language && <span style={styles.pill}>{language}</span>}
          <span style={styles.pill}>{starText}</span>
          <span style={styles.pill}>
            {(Number(vote_average) || 0).toFixed(1)}
          </span>
        </div>

        {/* 🔽 BOTTOM (testi) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {originalTitle && originalTitle !== displayTitle && (
            <p style={styles.originalRow}>
              <strong>Titolo originale:</strong> {originalTitle}
            </p>
          )}

          {overview && <p style={styles.overview}>{overview}</p>}
        </div>
      </div>

      {/* Titolo sempre visibile */}
      <div style={styles.titleBar}>
        <h3 style={styles.title}>{displayTitle}</h3>
      </div>
    </article>
  );
}
