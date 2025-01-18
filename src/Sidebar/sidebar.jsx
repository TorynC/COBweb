import React, { useState } from 'react';
import "./sidebar.css";
import {assets} from "../assets/assets.jsx";

const Sidebar = () => {

    const [extended, setExtended] = useState(false)

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={()=>setExtended(prev=> !prev)} className="menu" src={assets.menu_icon} alt=""/>
                {extended
                    ? <div className="topics">
                        <img src={assets.topics_icon} alt=""/>
                        <p>Topics</p>
                    </div>
                    : null}
                    {extended
                        ? <div className="analysis">
                            <img src={assets.analysis_icon} alt=""/>
                            <p>Analysis</p>
                        </div>
                        : null}

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