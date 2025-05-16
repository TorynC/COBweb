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
                            <p><strong>What is CobWeb?</strong></p>
                            <p>Cobweb is a program that will allow you to enter random topics and retrieve links to
                            articles as bubbles, clicking on those bubbles will redirect you to the article, there will
                            be options to select similar topics or the same topic again.</p>
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
