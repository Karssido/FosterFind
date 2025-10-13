import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import debounce from 'lodash.debounce';
import '../Common/common.css'

export default function OldAgeHomeBody() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allOldAgeHomes, setAllOldAgeHomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const itemsPerPage = 10;
  const pagesPerGroup = 3;

  useEffect(() => {
    setLoading(true);
    fetch('/oldAgeHomes.xlsx')
      .then(response => response.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setAllOldAgeHomes(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error reading Excel file:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 300),
    []
  );

  const handleSearch = (term) => {
    setLoading(true);
    const filteredOldAgeHomes = allOldAgeHomes.filter(home =>
      (home.State && home.State.toLowerCase().includes(term.toLowerCase())) ||
      (home.District && home.District.toLowerCase().includes(term.toLowerCase()))
    );
    setResults(filteredOldAgeHomes);
    setLoading(false);
    setCurrentPage(1); // Reset to first page on new search
    setPageGroup(0); // Reset to first page group on new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextGroup = () => {
    setPageGroup(pageGroup + 1);
    setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
  };

  const handlePrevGroup = () => {
    setPageGroup(pageGroup - 1);
    setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
  };

  const currentResults = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return results.slice(indexOfFirstItem, indexOfLastItem);
  }, [results, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return (
    <div className='findBody'>
      <div className='search'>
        <input
          type='search'
          placeholder='Search State or City...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => handleSearch(searchTerm)}>Search</button>
      </div>
      {loading ? (
        <div className='loader'></div>
      ) : (
        <div className='results'>
          {currentResults.length > 0 ? (
            currentResults.map((home, index) => (
              <div key={index} className='result-item'>
                <h3>{home.Home_Name}</h3>
                <p>{home.Address || 'Address not available'}</p>
                <p>{home.Telephone || 'Telephone not available'}</p>
              </div>
            ))
          ) : (
            <p className='no-results'>No results found</p>
          )}
        </div>
      )}
      <div className='pagination'>
        {pageGroup > 0 && (
          <button onClick={handlePrevGroup}>&laquo;</button>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(startPage + index)}
            className={currentPage === startPage + index ? 'active' : ''}
          >
            {startPage + index}
          </button>
        ))}
        {endPage < totalPages && (
          <button onClick={handleNextGroup}>&raquo;</button>
        )}
      </div>
    </div>
  );
}