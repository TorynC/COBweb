import React from 'react';
import "./topics.css";

const Topics = ({topicsVisible, toggleTopics, topics}) => {
    if (!topicsVisible) return null;

    return (
        <div className="topics-dropdown">
            <select>
                <option value="topic1">Topic1</option>

            </select>
        </div>
    );
};

export default Topics;