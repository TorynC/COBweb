import React, { useContext } from "react";
import "./Main.css";
import { Context } from "../context/Context.jsx";
import { assets } from "../assets/assets.jsx";

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p> Research Web </p>
            </div>
            <div className="main-container">
                <div className="web">
                    <p><span>Web Goes Here</span></p>
                </div>
            </div>
            <div className="main-bottom">
                <div className="prompt">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt."/>
                    <div>
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;