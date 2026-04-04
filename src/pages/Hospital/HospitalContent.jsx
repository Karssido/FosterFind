// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import * as XLSX from 'xlsx';
// import debounce from 'lodash.debounce';
// import hospitalsFile from '../../assets/data/hospitals.xlsx';
// import '../../assets/styles/common.css';

// export default function HospitalContent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
//   const [allHospitals, setAllHospitals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageGroup, setPageGroup] = useState(0);
//   const itemsPerPage = 10;
//   const pagesPerGroup = 3;

//   useEffect(() => {
//     setLoading(true);
//     fetch(hospitalsFile)
//       .then(response => response.arrayBuffer())
//       .then(data => {
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const json = XLSX.utils.sheet_to_json(worksheet);
//         setAllHospitals(json);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error reading Excel file:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleSearch = (term) => {
//     setLoading(true);
//     const filteredHospitals = allHospitals.filter(hospital =>
//       (hospital.State && hospital.State.toLowerCase().includes(term.toLowerCase())) ||
//       (hospital.District && hospital.District.toLowerCase().includes(term.toLowerCase()))
//     );
//     setResults(filteredHospitals);
//     setLoading(false);
//     setCurrentPage(1); // Reset to first page on new search
//     setPageGroup(0); // Reset to first page group on new search
//   };

//   const debouncedSearch = useCallback(
//     debounce((value) => {
//       handleSearch(value);
//     }, 300),
//     [allHospitals]
//   );

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     debouncedSearch(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch(searchTerm);
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleNextGroup = () => {
//     setPageGroup(pageGroup + 1);
//     setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
//   };

//   const handlePrevGroup = () => {
//     setPageGroup(pageGroup - 1);
//     setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
//   };

//   const currentResults = useMemo(() => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return results.slice(indexOfFirstItem, indexOfLastItem);
//   }, [results, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(results.length / itemsPerPage);
//   const startPage = pageGroup * pagesPerGroup + 1;
//   const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

//   return (
//     <div className='findBody'>
//       <div className='search'>
//         <input
//           type='search'
//           placeholder='Search State or City...'
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//         />
//         <button onClick={() => handleSearch(searchTerm)}>Search</button>
//       </div>
//       {loading ? (
//         <div className='loader'></div>
//       ) : (
//         <div className='results'>
//           {currentResults.length > 0 ? (
//             currentResults.map((hospital, index) => (
//               <div key={index} className='result-item'>
//                 <h3>{hospital.Hospital_Name}</h3>
//                 <p>{hospital.Address_Original_First_Line || 'Address not available'}</p>
//                 <p>{hospital.Telephone || 'Telephone not available'}</p>
//               </div>
//             ))
//           ) : (
//             <p className='no-results'>No results found</p>
//           )}
//         </div>
//       )}
//       <div className='pagination'>
//         {pageGroup > 0 && (
//           <button onClick={handlePrevGroup}>&laquo;</button>
//         )}
//         {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(startPage + index)}
//             className={currentPage === startPage + index ? 'active' : ''}
//           >
//             {startPage + index}
//           </button>
//         ))}
//         {endPage < totalPages && (
//           <button onClick={handleNextGroup}>&raquo;</button>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import debounce from 'lodash.debounce';
import hospitalsFile from '../../assets/data/hospitals.xlsx';
import '../../assets/styles/common.css';

export default function HospitalContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const itemsPerPage = 10;
  const pagesPerGroup = 3;

  useEffect(() => {
    setLoading(true);
    fetch(hospitalsFile)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setAllHospitals(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
        setLoading(false);
      });
  }, []);

  /** ✅ Memoize handleSearch */
  const handleSearch = useCallback(
    (term) => {
      setLoading(true);

      const filteredHospitals = allHospitals.filter(
        (hospital) =>
          (hospital.State &&
            hospital.State.toLowerCase().includes(term.toLowerCase())) ||
          (hospital.District &&
            hospital.District.toLowerCase().includes(term.toLowerCase()))
      );

      setResults(filteredHospitals);
      setLoading(false);
      setCurrentPage(1);
      setPageGroup(0);
    },
    [allHospitals]
  );

  /** ✅ Memoize debounced function */
  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, [handleSearch]);

  /** ✅ Cleanup debounce */
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
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
    setPageGroup((g) => g + 1);
    setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
  };

  const handlePrevGroup = () => {
    setPageGroup((g) => g - 1);
    setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
  };

  const currentResults = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return results.slice(indexOfFirstItem, indexOfLastItem);
  }, [results, currentPage]);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return (
    <div className="findBody">
      <div className="search">
        <input
          type="search"
          placeholder="Search State or City..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => handleSearch(searchTerm)}>Search</button>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="results">
          {currentResults.length > 0 ? (
            currentResults.map((hospital, index) => (
              <div key={index} className="result-item">
                <h3>{hospital.Hospital_Name}</h3>
                <p>
                  {hospital.Address_Original_First_Line ||
                    'Address not available'}
                </p>
                <p>{hospital.Telephone || 'Telephone not available'}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      )}

      <div className="pagination">
        {pageGroup > 0 && (
          <button onClick={handlePrevGroup}>&laquo;</button>
        )}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(startPage + index)}
              className={
                currentPage === startPage + index ? 'active' : ''
              }
            >
              {startPage + index}
            </button>
          )
        )}

        {endPage < totalPages && (
          <button onClick={handleNextGroup}>&raquo;</button>
        )}
      </div>
    </div>
  );
}