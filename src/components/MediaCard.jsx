export default function MediaCard({ item }) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

  const title = item.media_type === "tv" ? item.name : item.title;
  const originalTitle =
    item.media_type === "tv" ? item.original_name : item.original_title;

  // ⭐ funzione stelle
  function renderStars(voteAverage) {
    const stars = Math.ceil(voteAverage / 2);
    const max = 5;
    return "★".repeat(stars) + "☆".repeat(max - stars);
  }

  // 🌍 funzione bandiere
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

  return (
    <div className="card h-100 bg-dark text-light border-secondary">
      {/* 🎬 POSTER */}
      {item.poster_path && (
        <img
          src={IMAGE_BASE + item.poster_path}
          alt={title}
          className="card-img-top"
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        <p className="card-text mb-1">
          <strong>Titolo originale:</strong> {originalTitle}
        </p>

        {/* 🌍 LINGUA CON BANDIERA */}
        <p className="card-text mb-1">
          <strong>Lingua:</strong>{" "}
          <img
            src={`https://flagcdn.com/24x18/${getFlag(
              item.original_language,
            )}.png`}
            alt={item.original_language}
            style={{ marginLeft: 6 }}
          />{" "}
          <span className="text-secondary">({item.original_language})</span>
        </p>

        {/* ⭐ VOTO */}
        <p className="card-text mb-0">
          <strong>Voto:</strong> {renderStars(item.vote_average)}{" "}
          <span className="text-secondary">
            ({item.vote_average.toFixed(1)})
          </span>
        </p>
      </div>

      <div className="card-footer bg-transparent border-secondary">
        <span className="badge text-bg-secondary">
          {item.media_type === "tv" ? "TV" : "MOVIE"}
        </span>
      </div>
    </div>
  );
}
