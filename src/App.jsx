import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function handleSearch() {
    setResults([
      {
        id: 1,
        title: "Test Movie",
        original_title: "Test Movie",
        original_language: "en",
        vote_average: 7.2,
      },
    ]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>BoolFlix</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      <ResultsList items={results} />
    </div>
  );
}

export default App;
