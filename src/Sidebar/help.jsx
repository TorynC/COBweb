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
                    <h1>Help/FAQ</h1>
                    <span> </span>
                    <ul>
                        <li>
                            <p><strong>How do you access past topics?</strong></p>
                            <p>Access topics using the "topics" button in the sidebar.</p>
                        </li>
                        <li>
                            <p><strong>How do I change the settings?</strong></p>
                            <p>Access the "settings" button in the sidebar</p>
                        </li>
                        <li>
                            <p><strong>What do I enter as a prompt?</strong></p>
                            <p>Enter a link to an article or a any topic</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Help;
