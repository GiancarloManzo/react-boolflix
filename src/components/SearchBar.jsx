import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text);
  }

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Cerca un film o una serie..."
      />
      <button className="btn btn-danger" type="submit" disabled={loading}>
        {loading ? "..." : "Cerca"}
      </button>
    </form>
  );
}
