const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export default function MediaCard({ item }) {
  const title = item.media_type === "tv" ? item.name : item.title;
  const originalTitle =
    item.media_type === "tv" ? item.original_name : item.original_title;

  function renderStars(voteAverage) {
    const stars = Math.ceil(voteAverage / 2); // 0-10 -> 0-5 arrotondato per eccesso
    const max = 5;

    return "★".repeat(stars) + "☆".repeat(max - stars);
  }
  return (
    <div className="card h-100 bg-dark text-light border-secondary">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text mb-1">
          {item.poster_path && (
            <img
              src={IMAGE_BASE + item.poster_path}
              alt={title}
              className="card-img-top"
            />
          )}
          <strong>Titolo originale:</strong> {originalTitle}
        </p>
        <p className="card-text mb-1">
          <strong>Lingua:</strong> {item.original_language}
        </p>
        <p className="card-text mb-0">
          <p className="card-text mb-0">
            <strong>Voto:</strong> {renderStars(item.vote_average)}{" "}
            <span className="text-secondary">
              ({item.vote_average.toFixed(1)})
            </span>
          </p>
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
