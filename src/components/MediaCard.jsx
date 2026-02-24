const IMG_BASE = "https://image.tmdb.org/t/p/w342";

function toStars(voteAverage) {
  const v = Number(voteAverage) || 0;
  const five = Math.round(v / 2);
  return "★".repeat(five) + "☆".repeat(5 - five);
}

export default function MediaCard({ item }) {
  const title = item.title || item.name;
  const original = item.original_title || item.original_name;

  const imgPath = item.poster_path || item.backdrop_path;
  const imgUrl = imgPath ? `${IMG_BASE}${imgPath}` : null;

  return (
    <article className="bf-card">
      <div className="bf-poster">
        {imgUrl ? (
          <img
            className="bf-poster__img"
            src={imgUrl}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="bf-poster__fallback">No Poster</div>
        )}

        {/* Title strip ALWAYS visible */}
        <div className="bf-titleStrip">
          <h3 className="bf-title">{title}</h3>
        </div>

        {/* Hover overlay */}
        <div className="bf-overlay">
          <div className="bf-topRow">
            <span
              className={`bf-pill ${item.media_type === "tv" ? "is-tv" : "is-movie"}`}
            >
              {item.media_type === "tv" ? "SERIE" : "FILM"}
            </span>
            <span className="bf-pill is-lang">
              {(item.original_language || "—").toUpperCase()}
            </span>
            <span className="bf-stars">{toStars(item.vote_average)}</span>
          </div>

          <p className="bf-original">Titolo originale: {original || "—"}</p>

          <p className={`bf-overview ${item.overview ? "" : "is-empty"}`}>
            {item.overview || "Nessuna overview disponibile."}
          </p>
        </div>
      </div>
    </article>
  );
}
