import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

    const renderPageButtons = () => {
        const pageButtons = [];
        const maxVisiblePages = 5;
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxVisiblePages) {
            const halfVisible = Math.floor(maxVisiblePages / 2);

            if (currentPage <= halfVisible + 1) {
                endPage = maxVisiblePages;
            } else if (currentPage >= totalPages - halfVisible) {
                startPage = totalPages - maxVisiblePages + 1;
            } else {
                startPage = currentPage - halfVisible;
                endPage = currentPage + halfVisible;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 border rounded-md text-sm ${currentPage === i ? 'bg-yellow-400 text-gray-800 border-yellow-400' : 'bg-white hover:bg-gray-50 border-gray-300'}`}
                >
                    {i}
                </button>,
            );
        }

        return pageButtons;
    };

    return (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems} entries
            </div>

            <div className="flex space-x-1">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-gray-50 transition-colors"
                >
                    Previous
                </button>

                {renderPageButtons()}

                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-gray-50 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
