import React, { useState, useEffect, useMemo } from 'react';
import PageHero from '../Common/PageHero/PageHero';
import '../../assets/styles/common.css';

const ITEMS_PER_PAGE = 10;
const PAGES_PER_GROUP = 3;
const DEBOUNCE_MS = 300;

/**
 * Searchable, paginated directory backed by a JSON file in public/data
 * (generated from data-source/*.xlsx by `npm run convert-data`).
 */
export default function DirectoryPage({ dataFile, title, subtitle, heroImage, placeholder = 'Search State, City or Name...' }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${process.env.PUBLIC_URL}/data/${dataFile}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Precompute a lowercase search string once instead of on every keystroke.
        setRecords(
          data.map((item) => ({
            ...item,
            haystack: [item.name, item.address, item.district, item.state].filter(Boolean).join(' ').toLowerCase(),
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Error loading data:', err);
        setError('Could not load the data. Please try again later.');
        setLoading(false);
      });
    return () => controller.abort();
  }, [dataFile]);

  // Debounce typing into the active query.
  useEffect(() => {
    const timer = setTimeout(() => setQuery(searchTerm), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return records.filter((item) => item.haystack.includes(term));
  }, [records, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const searchNow = () => setQuery(searchTerm);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') searchNow();
  };

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startPage = Math.floor((currentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = results.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  let message = null;
  if (error) message = error;
  else if (!query.trim()) message = 'Enter a state, city or name to start searching';
  else if (results.length === 0) message = 'No results found';

  return (
    <>
    <PageHero title={title} subtitle={subtitle} image={heroImage} />
    <div className="findBody">
      <div className="search">
        <input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchNow}>Search</button>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : message ? (
        <p className="no-results">{message}</p>
      ) : (
        <>
          <p className="result-count">
            {results.length} result{results.length === 1 ? '' : 's'} · Page {currentPage} of {totalPages}
          </p>
          <div className="results">
            {currentResults.map((item) => (
              <div key={`${item.name}-${item.address}-${item.phone}`} className="result-item">
                <h3>{item.name}</h3>
                <p>{item.address || 'Address not available'}</p>
                <p>{[item.district, item.state].filter(Boolean).join(', ')}</p>
                <p>{item.phone || 'Telephone not available'}</p>
                {item.coordinates && (
                  <p>
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(item.coordinates)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on map
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pagination">
            {startPage > 1 && <button onClick={() => setCurrentPage(startPage - 1)}>&laquo;</button>}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                onClick={() => setCurrentPage(startPage + index)}
                className={currentPage === startPage + index ? 'active' : ''}
              >
                {startPage + index}
              </button>
            ))}
            {endPage < totalPages && <button onClick={() => setCurrentPage(endPage + 1)}>&raquo;</button>}
          </div>
        </>
      )}
    </div>
    </>
  );
}
