import React from 'react';
import "./settings.css";

const Settings = ({ visible, onClose }) => {
    if (!visible) return null; // If not visible, return nothing

    return (
        <>
            <div className="settings-overlay" onClick={onClose}></div>
            <div className="settings-popup">
                <div className="settings-popup-content">
                    <button className="settings-popup-close" onClick={onClose}>
                        &times;
                    </button>
                    <h1>SETTINGS</h1>
                    <h2>AAAAAAAAAAAAAAAAAAAAAAA</h2>
                </div>
            </div>
        </>
    );
};

export default Settings;