import React, { useState } from 'react';
import "./topics.css";
import { assets } from "../assets/assets.jsx";
import ArticleNode from "../ArticleNode.jsx";

const Topics = () => {
    const [showTopics, setShowTopics] = useState(false); // State for controlling the visibility of Topics

    const toggleTopics = () => {
        setShowTopics(prev => !prev); // Toggle topics visibility
    };

    return (
        <div className="topics-container"> {/* Updated container for alignment */}
            <div className="topics" onClick={toggleTopics}>
                <img src={assets.topics_icon} alt="Topics Icon"/>
                <p>Topics</p>
            </div>
            {showTopics && (
                <div className="topics-dropdown">
                    <ul>

                        {["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"].map(topic => (
                            <button key={topic} className="topic-item"> {/* Updated to li for list items */}
                                {topic}
                            </button>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Topics;
