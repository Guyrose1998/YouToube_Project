import React from 'react';
import '../styles/DarkModeToggle.css';

const DarkModeToggle = ({ handleToggle, isDarkMode }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={isDarkMode}
        onChange={handleToggle}
      />
      <label htmlFor="checkbox" className="label">
        <div className="ball" />
      </label>
    </div>
  );
};

export default DarkModeToggle;
