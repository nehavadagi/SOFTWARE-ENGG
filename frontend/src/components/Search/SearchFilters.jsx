import React from 'react';

const SearchFilters = ({ filters, onFilterChange }) => {
  const licenseOptions = [
    { value: 'all', label: 'All Licenses' },
    { value: 'cc0', label: 'CC0' },
    { value: 'cc-by', label: 'CC BY' },
    { value: 'cc-by-sa', label: 'CC BY-SA' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'jpg', label: 'JPG' },
    { value: 'png', label: 'PNG' },
    { value: 'gif', label: 'GIF' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="filters-panel">
      <h3>Filters</h3>
      
      <div className="filter-group">
        <label>License Type:</label>
        <select 
          value={filters.license} 
          onChange={(e) => handleFilterChange('license', e.target.value)}
        >
          {licenseOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Image Type:</label>
        <select 
          value={filters.image_type} 
          onChange={(e) => handleFilterChange('image_type', e.target.value)}
        >
          {typeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;