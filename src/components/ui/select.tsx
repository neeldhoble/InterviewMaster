"use client";

import { useState, useEffect, useRef } from 'react';

// Type definition for select option
interface Option {
  label: string;
  value: string;
}

// Props for the Select component
interface SelectProps {
  options: Option[];
  label: string;
  onChange: (value: string) => void;
  value: string;
}

// Select component
export function Select({ options, label, onChange, value }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    // Add a small delay before closing to prevent accidental closures
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        {/* Dropdown button */}
        <button
          type="button"
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          onClick={toggleDropdown}
        >
          {value ? options.find(option => option.value === value)?.label : 'Select an option'}
        </button>

        {/* Dropdown options */}
        {isOpen && (
          <ul 
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {options.map(option => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={`px-4 py-2 cursor-pointer transition-colors duration-150
                  ${option.value === value ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                  hover:bg-gray-100`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
