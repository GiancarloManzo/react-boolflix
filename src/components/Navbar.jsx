import SearchBar from "./SearchBar";

export default function Navbar({
  query,
  setQuery,
  onSearch,
  activeTab,
  setActiveTab,
}) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top border-bottom border-secondary">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-danger"
          style={{ letterSpacing: "1px" }}
        >
          BOOLFLIX
        </span>

        <div className="d-flex gap-2 align-items-center">
          <div className="nav nav-pills me-2">
            <button
              className={`nav-link ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
              type="button"
            >
              Tutto
            </button>
            <button
              className={`nav-link ${activeTab === "movie" ? "active" : ""}`}
              onClick={() => setActiveTab("movie")}
              type="button"
            >
              Film
            </button>
            <button
              className={`nav-link ${activeTab === "tv" ? "active" : ""}`}
              onClick={() => setActiveTab("tv")}
              type="button"
            >
              Serie
            </button>
          </div>

          <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}
