import React, { useContext } from "react";
import "./Main.css";
import { Context } from "../context/Context.jsx";
import { assets } from "../assets/assets.jsx";
import Tree from "../Tree.jsx";
import Article from "../Article.jsx";
import renderWeb from "./Web.jsx";

const Main = () => {

    const {onSent, setInput, input, root, error, setError} = useContext(Context);

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
            {input != "Complete" ?
                <div className="main-bottom">
                    <div className="prompt">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text"
                               placeholder="Enter a topic or link to an article."/>
                        <div>
                            <img onClick={() => onSent(0)} src={assets.send_icon} alt=""/>
                        </div>
                    </div>
                </div>
                : <div className="button-bottom">
                    <div onClick={() => onSent(1)} className="more">
                        <p> More from this topic</p>
                    </div>
                    <div onClick={() => onSent(2)} className="new">
                        <p><span>{root.adjacent.trim("\"")}</span></p>
                    </div>
                </div>}
        </div>
    )
}

export default Main;