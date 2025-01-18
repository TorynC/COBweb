import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import "./ArticleNode.css";

const handleStyle = { left: 10 };

function ArticleNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text-updater-node">
            <Handle
                position={Position.Top}
                isConnectable={isConnectable}
                type="target"
            />
            <div className="circle">
                <p className="text">{data.value.title}</p>
            </div>
            <Handle
                position={Position.Bottom}
                isConnectable={isConnectable}
                type="source"
            />
        </div>
    );
}

export default ArticleNode;