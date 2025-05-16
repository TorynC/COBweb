import React, {useState} from 'react';
import "./settings.css";
import { Toggle } from "./components/toggle.jsx";

const Settings = ({ visible, onClose, darkness, setDarkness}) => {
    if (!visible) return null; // If not visible, return nothing
    function swapTheme() {
        setDarkness(!darkness);
    }
    return (
        <>
            <div className="settings-overlay" onClick={onClose}></div>
            <div className="settings-popup" data-theme = {darkness ? "dark" : "light"}>
                <div className="settings-popup-content">
                    <button className="settings-popup-close" onClick={onClose}>
                        &times;
                    </button>
                    <h1>SETTINGS</h1>
                    <Toggle isChecked={darkness} handleChange={() => swapTheme()}/>
                </div>
            </div>
        </>
    );
};

export default Settings;