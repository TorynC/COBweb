import React, { useState } from 'react';
import "./sidebar.css";
import {assets} from "../assets/assets.jsx";

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const [showAnalysis, setShowAnalysis] = useState(false);

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
                )}

                    </div>
                    <div className="bottom">
                    <div className="bottom-item analysis">
                    <img src={assets.question_icon} alt=""/>
                        {extended?<p>Help</p>: null}
                    </div>
    <div className="bottom-item analysis">
        <img src={assets.gear_icon} alt=""/>
                        {extended?<p>Settings</p>: null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;