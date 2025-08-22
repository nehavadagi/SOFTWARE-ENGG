// frontend/src/components/Search/AdvancedFilters.js
import React from 'react';

const AdvancedFilters = ({ filters, onFilterChange }) => {
  const licenseTypes = [
    'commercial', 'modification', 'all'
  ];

  const licenses = [
    'by', 'by-sa', 'by-nd', 'by-nc', 'by-nc-sa', 'by-nc-nd', 'cc0', 'pdm'
  ];

  const extensions = ['jpg', 'png', 'gif', 'svg'];
  const sizes = ['small', 'medium', 'large'];
  const aspectRatios = ['square', 'wide', 'tall'];

  return (
    <div className="advanced-filters">
      <h3>Advanced Filters</h3>
      
      <div className="filter-group">
        <label>License Type:</label>
        <select 
          value={filters.license_type || ''} 
          onChange={(e) => onFilterChange('license_type', e.target.value)}
        >
          <option value="">Any</option>
          {licenseTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Specific License:</label>
        <select 
          value={filters.license || ''} 
          onChange={(e) => onFilterChange('license', e.target.value)}
        >
          <option value="">Any</option>
          {licenses.map(license => (
            <option key={license} value={license}>{license}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>File Type:</label>
        <select 
          value={filters.extension || ''} 
          onChange={(e) => onFilterChange('extension', e.target.value)}
        >
          <option value="">Any</option>
          {extensions.map(ext => (
            <option key={ext} value={ext}>{ext}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Size:</label>
        <select 
          value={filters.size || ''} 
          onChange={(e) => onFilterChange('size', e.target.value)}
        >
          <option value="">Any</option>
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Aspect Ratio:</label>
        <select 
          value={filters.aspect_ratio || ''} 
          onChange={(e) => onFilterChange('aspect_ratio', e.target.value)}
        >
          <option value="">Any</option>
          {aspectRatios.map(ratio => (
            <option key={ratio} value={ratio}>{ratio}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Media Type:</label>
        <select 
          value={filters.type || 'image'} 
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <option value="image">Images</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </div>
    </div>
  );
};

export default AdvancedFilters;