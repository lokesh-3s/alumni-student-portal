import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li>
          <a onClick={() => onPageChange(currentPage - 1)} href="#!" className={currentPage === 1 ? 'disabled' : ''}>
            &laquo;
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <a onClick={() => onPageChange(number)} href="#!">
              {number}
            </a>
          </li>
        ))}
        <li>
          <a onClick={() => onPageChange(currentPage + 1)} href="#!" className={currentPage === totalPages ? 'disabled' : ''}>
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;