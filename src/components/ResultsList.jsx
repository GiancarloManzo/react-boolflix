import MediaCard from "./MediaCard";

export default function ResultsList({ items }) {
  if (!items.length)
    return <p className="text-secondary mt-3">Nessun risultato</p>;

  return (
    <div className="row g-3 mt-2">
      {items.map((item) => (
        <div
          key={`${item.media_type}-${item.id}`}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <MediaCard item={item} />
        </div>
      ))}
    </div>
  );
}
