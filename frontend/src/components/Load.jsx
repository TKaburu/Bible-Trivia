import React from 'react';
import '../styles/load.css';

const Load = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Questions...</p>
        </div>
    );
};

export default Load;
