import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center mt-6 mb-8">
            <nav className="inline-flex rounded-md shadow">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 border border-gray-300 text-sm font-medium rounded-l-md flex items-center ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = currentPage;
                    if (currentPage <= 3) {
                        pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                    } else {
                        pageNum = currentPage - 2 + i;
                    }
                    if (pageNum <= 0 || pageNum > totalPages) return null;

                    return (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 border border-gray-300 text-sm font-medium ${pageNum === currentPage ? 'bg-yellow-400 text-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 border border-gray-300 text-sm font-medium rounded-r-md flex items-center ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    Next
                    <ArrowLeft className="h-3 w-3 ml-1 transform rotate-180" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
