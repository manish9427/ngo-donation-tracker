import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    onFilterChange(selectedStatus);
  };

  return (
    <div className="filter-bar">
      <select value={status} onChange={handleFilter} className="filter-select">
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Picked Up">Picked Up</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  );
};

export default FilterBar;