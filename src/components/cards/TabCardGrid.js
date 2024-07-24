import React, { useState } from "react";
import { searchMercadoLibre } from "../../mercadoLibreService";

export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const results = await searchMercadoLibre(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || `Error code: ${err.status}`);
    }
  };

  return (
    <div>
      <h1>Compare MercadoLibre Products</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Type For example: dryer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Get the best</button>
      </form>

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}

      {searchResults && (
        <div>
          <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};