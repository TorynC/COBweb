import React, { useContext } from "react";
import "./Main.css";
import { Context } from "../context/Context.jsx";
import { assets } from "../assets/assets.jsx";
import Tree from "../Tree.jsx";
import Article from "../Article.jsx";
import renderWeb from "../Web.jsx";

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, root} = useContext(Context);
    const placeholder = "Web Goes Here\nWeb Goes Here\nWeb Goes Here\nWeb Goes Here\nWeb Goes Here";

    //Create web


    return (
        <div className="main">
            <div className="nav">
                <p> Research Web </p>
            </div>
            <div className="main-container">
                {root != null ? renderWeb(): null}
                {/*<div style={{height: '700px', overflow: 'scroll'}}>*/}
                {/*    <div className="web">*/}
                {/*        <p><span>{placeholder}</span></p>*/}
                {/*    </div>*/}
                {/*</div>*/}
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