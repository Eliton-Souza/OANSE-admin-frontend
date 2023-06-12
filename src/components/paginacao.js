import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';

const Paginacao = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <CPagination aria-label="Page navigation example" align="center">
      <CPaginationItem
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <CPaginationItem
          key={index}
          active={currentPage === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </CPaginationItem>
      ))}
      <CPaginationItem
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  );
};

export default Paginacao;
