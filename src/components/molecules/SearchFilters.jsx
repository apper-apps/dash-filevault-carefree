import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { formatDate } from '@/utils/formatters';

const SearchFilters = ({ 
  isOpen, 
  onToggle, 
  dateRange, 
  onDateRangeChange, 
  sizeRange, 
  onSizeRangeChange,
  onClearFilters 
}) => {
  const [customSizeMode, setCustomSizeMode] = useState(false);
  const [customMinSize, setCustomMinSize] = useState('');
  const [customMaxSize, setCustomMaxSize] = useState('');

  const predefinedSizeRanges = [
    { label: 'All Sizes', value: null },
    { label: 'Small (< 1 MB)', value: { min: 0, max: 1024 * 1024 } },
    { label: 'Medium (1-10 MB)', value: { min: 1024 * 1024, max: 10 * 1024 * 1024 } },
    { label: 'Large (> 10 MB)', value: { min: 10 * 1024 * 1024, max: null } },
    { label: 'Custom Range', value: 'custom' }
  ];

  const handleSizeRangeSelect = (range) => {
    if (range.value === 'custom') {
      setCustomSizeMode(true);
      return;
    }
    setCustomSizeMode(false);
    onSizeRangeChange(range.value);
  };

  const handleCustomSizeApply = () => {
    const minBytes = customMinSize ? parseInt(customMinSize) * 1024 * 1024 : 0;
    const maxBytes = customMaxSize ? parseInt(customMaxSize) * 1024 * 1024 : null;
    
    if (minBytes >= 0 && (maxBytes === null || maxBytes > minBytes)) {
      onSizeRangeChange({ min: minBytes, max: maxBytes });
    }
  };

  const handleDateChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    onDateRangeChange(newDateRange);
  };

  const hasActiveFilters = dateRange.start || dateRange.end || sizeRange;

  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      {/* Toggle Button */}
      <div className="px-4 sm:px-6 lg:px-8">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" className="w-4 h-4" />
            <span>Advanced Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                Active
              </span>
            )}
          </div>
          <ApperIcon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            className="w-4 h-4 transition-transform" 
          />
        </button>
      </div>

      {/* Filters Panel */}
      {isOpen && (
        <div className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Range Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-neutral-900">Date Range</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">From</label>
                  <Input
                    type="date"
                    value={dateRange.start || ''}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">To</label>
                  <Input
                    type="date"
                    value={dateRange.end || ''}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
              </div>
            </div>

            {/* File Size Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-neutral-900">File Size</h4>
              <div className="space-y-2">
                {predefinedSizeRanges.map((range, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sizeRange"
                      checked={
                        !customSizeMode && (
                          (range.value === null && sizeRange === null) ||
                          (range.value && sizeRange && 
                           range.value.min === sizeRange.min && 
                           range.value.max === sizeRange.max)
                        )
                      }
                      onChange={() => handleSizeRangeSelect(range)}
                      className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700">{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Custom Size Range Inputs */}
              {customSizeMode && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-neutral-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Min Size (MB)</label>
                      <Input
                        type="number"
                        value={customMinSize}
                        onChange={(e) => setCustomMinSize(e.target.value)}
                        placeholder="0"
                        className="w-full text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Max Size (MB)</label>
                      <Input
                        type="number"
                        value={customMaxSize}
                        onChange={(e) => setCustomMaxSize(e.target.value)}
                        placeholder="No limit"
                        className="w-full text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCustomSizeApply}
                    className="mt-3"
                  >
                    Apply Custom Range
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-neutral-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;