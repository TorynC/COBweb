import React from 'react';
import "./help.css";

const Help = ({ visible, onClose }) => {
    if (!visible) return null; // If not visible, return nothing

    return (
        <>
            <div className="help-overlay" onClick={onClose}></div>
            <div className="help-popup">
                <div className="help-popup-content">
                    <button className="help-popup-close" onClick={onClose}>
                        &times;
                    </button>
                    <h2>Help/FAQ</h2>
                    <p>Here you can provide some helpful information or FAQs.</p>
                </div>
            </div>
        </>
    );
};

export default Help;
