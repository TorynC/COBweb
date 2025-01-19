import {useCallback, useContext} from 'react';
import { Handle, Position } from '@xyflow/react';
import "./ArticleNode.css";
import {Context} from "./context/Context.jsx";

const handleStyle = { left: 10 };

function ArticleNode({ data, isConnectable }) {
    const {setRoot, root} = useContext(Context);
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text-updater-node">
            <div onClick={() => setRoot(data.value)} className="circle">
                <p className="text">{data.value.title}</p>
            </div>
            <Handle
                position={Position.Bottom}
                isConnectable={isConnectable}
                type="target"
            />
            <Handle
                position={Position.Bottom}
                isConnectable={isConnectable}
                type="source"
            />
        </div>
    );
}

export default ArticleNode;