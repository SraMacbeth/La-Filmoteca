import React from "react";
import "./Pagination.css"

export const Pagination = ({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-5 paginacion">
      <button
        className={`btn btn-primary m-2 ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={onPrevPage}
        disabled={currentPage === 1}>
        Anterior
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => onPageChange(number + 1)}
          className={`btn btn-ligth m-1 ${currentPage === number + 1 ? 'active' : ""}`}
        >
          {number + 1}
        </button>
      ))}
      <button
        className={`btn btn-primary m-2 ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};