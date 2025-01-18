import React, { useState } from 'react';
import "./sidebar.css";

import { assets } from "../assets/assets.jsx";
import Help from "./help.jsx";
import Settings from "./settings.jsx";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [helpVisible, setHelpVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const toggleHelpPopup = () => setHelpVisible((prev) => !prev);
    const toggleSettingsPopup = () => setSettingsVisible((prev) => !prev);


    const toggleExtended = () => {
        setExtended(prev=> !prev);
        if (extended) {
            setShowAnalysis(false);
        }
    }

    const toggleAnalysis = () => {
        setShowAnalysis(prev=> !prev);
    }
    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={toggleExtended} className="menu" src={assets.menu_icon} alt=""/>
                {extended
                    ? <div className="topics">
                        <img src={assets.topics_icon} alt=""/>
                        <p>Topics</p>
                    </div>
                    : null}
                    {extended
                        ? <div className="analysis"
                        onClick={toggleAnalysis}>
                            <img src={assets.analysis_icon} alt=""/>
                            <p>Analysis</p>
                        </div>
                        : null}
                {extended && showAnalysis &&(
                    <div className="analysis">
                        {["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"].map(option => (
                            <button key={option} className={"analysisOptions"}>
                                {option}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div
                    className="bottom-item analysis"
                    onClick={toggleHelpPopup}>
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item analysis"
                     onClick={toggleSettingsPopup}>
                    <img src={assets.gear_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>

            {/* Render the Help popup */}
            <Help visible={helpVisible} onClose={toggleHelpPopup} />
            {/* Render the Settings popup */}
            <Settings visible={settingsVisible} onClose={toggleSettingsPopup} />
        </div>
    )
}

export default Sidebar;