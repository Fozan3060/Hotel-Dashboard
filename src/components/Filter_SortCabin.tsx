import React from 'react';
import { useSearchParams } from 'react-router';
import SortDropdown from './SortDropdown';

const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Discount', value: 'discount' },
    { label: 'No Discount', value: 'no-discount' },
];

const sortOptions = [
    { label: 'Min Price', value: 'minPrice' },
    { label: 'Max Price', value: 'maxPrice' },
    { label: 'Min Discount', value: 'minDiscount' },
    { label: 'Max Discount', value: 'maxDiscount' },
];

const Filter_SortCabin: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentFilter = searchParams.get('discount') || 'all';
    const currentSort = searchParams.get('sortBy') || '';

    const handleFilter = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all') {
            newParams.delete('discount');
        } else {
            newParams.set('discount', value);
        }
        setSearchParams(newParams);
    };

    const handleSort = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sortBy', value);
        setSearchParams(newParams);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 items-start sm:items-center">
            {/* Filters */}
            <div className="flex gap-3">
                {filterOptions.map((option) => {
                    const isActive =
                        currentFilter === option.value || (option.value === 'all' && !searchParams.get('discount'));
                    return (
                        <button
                            key={option.value}
                            onClick={() => handleFilter(option.value)}
                            className={`px-4 py-2 rounded-xl border transition ${isActive
                                ? 'bg-zinc-600 text-white border-zinc-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-zinc-400'
                                }`}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>

            <SortDropdown currentSort={currentSort}
                handleSort={handleSort}
                sortOptions={sortOptions} />
        </div>
    );
};

export default Filter_SortCabin;
