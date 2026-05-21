
import React from 'react';
interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
    const { current_page, last_page, links } = meta;

    const handlePageChange = (page: string | number) => {
        if (typeof page === 'string') {
            const url = links.find(link => link.label === page)?.url;
            if (url) {
                const params = new URL(url).searchParams;
                const newPage = Number(params.get('page'));
                if (newPage) onPageChange(newPage);
            }
        } else {
            onPageChange(page);
        }
    };

    return (
        <div className="flex  space-x-2 flex-wrap gap-3 items-center justify-center  ">
            {/* <button
                className={`px-2 py-1 ${current_page === 1 ? 'opacity-50 cursor-not-allowed bg-blue_light' : ''}`}
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
            >
                <ChevronLeft />
            </button> */}

            {links.map((link, index) => (

                <button
                    key={index}
                    className={`px-3 py-1 rounded ${link.active ? 'bg-primary text-white' : 'bg-blue_light text-black'
                        }`}
                    onClick={() => handlePageChange(link.label)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}

            {/* <button
                className={`px-2 py-1 ${current_page === last_page ? 'opacity-50 cursor-not-allowed bg-blue_light' : 'bg-blue_light'}`}
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page === last_page}
            >
                <ChevronRight />
            </button> */}

            <span>Total {last_page} Pages</span>
            <span>Go to Page</span>
            <input
                type="number"
                min="1"
                max={last_page}
                value={current_page}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="w-12  py-1 text-center border rounded focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
            />
            <button
                className="px-2 py-1 bg-purple-300 rounded"
                onClick={() => handlePageChange(current_page)}
            >
                Go
            </button>
        </div>
    );
};

export default Pagination;
