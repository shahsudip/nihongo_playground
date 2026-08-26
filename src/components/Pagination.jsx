import React from 'react';

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // e.g. 1 ... 3 4 5
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-4 space-x-1 md:space-x-2 -ml-6 -mr-6 md:ml-0 md:mr-0 mb-8">
      <button 
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="px-2 py-1 md:px-4 md:py-2 rounded-l-md border border-black bg-white text-gray-500 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-white transition-colors"
      >
        <span className="hidden md:inline text-black">Previous</span>
        <span className="md:hidden text-black">Prev</span>
      </button>

      {getPageNumbers().map((p, idx) => (
        <React.Fragment key={idx}>
          {p === '...' ? (
            <span className="px-2 py-1 md:px-4 md:py-2 text-gray-500 select-none cursor-default border-t border-b border-black bg-white">
              ...
            </span>
          ) : (
            <button
              onClick={() => handlePageChange(p)}
              className={`px-2 py-1 md:px-4 md:py-2 border border-black ${
                page === p
                  ? 'bg-black text-white font-bold'
                  : 'bg-white text-black hover:bg-gray-100'
              } transition-colors`}
            >
              {p}
            </button>
          )}
        </React.Fragment>
      ))}

      <button 
        disabled={page === totalPages || totalPages === 0}
        onClick={() => handlePageChange(page + 1)}
        className="px-2 py-1 md:px-4 md:py-2 rounded-r-md border border-black bg-white text-black disabled:cursor-not-allowed hover:bg-black hover:text-white disabled:hover:bg-white disabled:hover:text-black transition-colors"
      >
        <span className="hidden md:inline">Next</span>
        <span className="md:hidden">Next</span>
      </button>
    </div>
  );
}
