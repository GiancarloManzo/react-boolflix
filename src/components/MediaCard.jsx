export default function MediaCard({ item }) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";
  const FALLBACK = "https://via.placeholder.com/342x513?text=No+Poster";

  const title = item.media_type === "tv" ? item.name : item.title;
  const originalTitle =
    item.media_type === "tv" ? item.original_name : item.original_title;

  function renderStars(voteAverage) {
    const stars = Math.ceil(voteAverage / 2);
    const max = 5;
    return "★".repeat(stars) + "☆".repeat(max - stars);
  }

  function getFlag(lang) {
    const map = {
      en: "gb",
      it: "it",
      fr: "fr",
      es: "es",
      de: "de",
      ja: "jp",
      ko: "kr",
      zh: "cn",
    };
    return map[lang] || "xx";
  }

  const posterUrl = item.poster_path ? IMAGE_BASE + item.poster_path : FALLBACK;

  return (
    <div className="nx-card">
      <div
        className="nx-poster"
        style={{ backgroundImage: `url(${posterUrl})` }}
        aria-label={title}
      />

      <div className="nx-overlay">
        <h5 className="nx-title">{title}</h5>

        <div className="nx-meta">
          <span>{renderStars(item.vote_average)}</span>
          <span className="text-secondary">
            ({item.vote_average.toFixed(1)})
          </span>
          <img
            src={`https://flagcdn.com/24x18/${getFlag(item.original_language)}.png`}
            alt={item.original_language}
            style={{ marginLeft: 4 }}
          />
          <span className="badge text-bg-secondary">
            {item.media_type === "tv" ? "TV" : "MOVIE"}
          </span>
        </div>

        <div className="nx-overview">
          <strong>Overview:</strong>{" "}
          {item.overview && item.overview.trim()
            ? item.overview
            : "Nessuna descrizione disponibile."}
        </div>

        <div
          className="text-secondary"
          style={{ fontSize: "0.78rem", marginTop: 6 }}
        >
          <strong>Orig:</strong> {originalTitle}
        </div>
      </div>
    </div>
  );
}
