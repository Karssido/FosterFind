import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import debounce from 'lodash.debounce';
import orphanagesFile from '../../assets/data/orphanages.xlsx';
import '../../assets/styles/common.css';

export default function OrphanageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allOrphanages, setAllOrphanages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const itemsPerPage = 10;
  const pagesPerGroup = 3;

  useEffect(() => {
    setLoading(true);
    fetch(orphanagesFile)
      .then(response => response.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setAllOrphanages(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error reading Excel file:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term) => {
    setLoading(true);
    const filteredOrphanages = allOrphanages.filter(orph =>
      (orph.State && orph.State.toLowerCase().includes(term.toLowerCase())) ||
      (orph.District && orph.District.toLowerCase().includes(term.toLowerCase()))
    );
    setResults(filteredOrphanages);
    setLoading(false);
    setCurrentPage(1); // Reset to first page on new search
    setPageGroup(0); // Reset to first page group on new search
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 300),
    [allOrphanages]
  );

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
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
            currentResults.map((orph, index) => (
              <div key={index} className='result-item'>
                <h3>{orph.Orphanage_Name}</h3>
                <p>{orph.Address || 'Address not available'}</p>
                <p>{orph.Telephone || 'Telephone not available'}</p>
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