"use client";
import React, { useState } from 'react';

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="flex justify-end items-center space-x-1 mt-4">
      {/* Previous button */}
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {[1, 2, 3].map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
            currentPage === page
              ? 'bg-[#10A100] text-white'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-1 rounded border bg-[#10A100] border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="white" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
      </button>
    </div>
  );
}