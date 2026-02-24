import MediaCard from "./MediaCard";

export default function ResultsList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="alert alert-dark border-secondary">
        Cerca un film o una serie per vedere i risultati.
      </div>
    );
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-4 mt-3">
      {items.map((item) => (
        <div className="col" key={`${item.media_type}-${item.id}`}>
          <MediaCard item={item} />
        </div>
      ))}
    </div>
  );
}
