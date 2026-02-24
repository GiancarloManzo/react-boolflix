export default function SearchBar({ query, setQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control form-control-sm me-2"
        placeholder="Cerca film o serie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-sm btn-danger" type="submit">
        Cerca
      </button>
    </form>
  );
}
