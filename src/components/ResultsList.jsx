import MediaCard from "./MediaCard";

export default function ResultsList({ items }) {
  if (!items.length)
    return <p className="text-secondary mt-3">Nessun risultato</p>;

  return (
    <div className="results-grid mt-3">
      {items.map((item) => (
        <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
      ))}
    </div>
  );
}
