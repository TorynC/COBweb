import {
    forceSimulation,
    forceLink,
    forceManyBody,
    forceX,
    forceY,
    forceCollide
} from 'd3-force';
import React, {useCallback, useContext, useMemo, useRef, useEffect, useState} from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
    useNodesInitialized,
    Controls,
    Background,
    useStoreApi,
    Handle,
    useUpdateNodeInternals,
    addEdge
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import ArticleNode from "../ArticleNode.jsx";
import Article from "../Article.jsx";
import {Context} from "../context/Context.jsx";

var firstMade = false;
var localNodes = 0;
const initialNodes = [];

const nodeTypes = { article: ArticleNode };

const initialEdges = [];

const simulation = forceSimulation()
    .force('charge', forceManyBody().strength(-1000))
    .force('x', forceX().x(0).strength(0.08))
    .force('y', forceY().y(0).strength(0.08))
    .force('collide', forceCollide(1))
    .alphaTarget(0.05)
    .stop();

const useLayoutedElements = () => {
    const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
    const initialized = useNodesInitialized();

    const draggingNodeRef = useRef(null);
    const dragEvents = useMemo(
        () => ({
            start: (_event, node) => (draggingNodeRef.current = node),
            drag: (_event, node) => (draggingNodeRef.current = node),
            stop: () => (draggingNodeRef.current = null),
        }),
        [],
    );

    return useMemo(() => {
        let nodes = getNodes().map((node) => ({
            ...node,
            x: node.position.x,
            y: node.position.y,
        }));
        let edges = getEdges().map((edge) => edge);
        let running = false;

        // If React Flow hasn't initialized our nodes with a width and height yet, or
        // if there are no nodes in the flow, then we can't run the simulation!
        if (!initialized || nodes.length === 0) return [false, {}, dragEvents];

        simulation.nodes(nodes).force(
            'link',
        );

        // The tick function is called every animation frame while the simulation is
        // running and progresses the simulation one step forward each time.
        const tick = () => {
            getNodes().forEach((node, i) => {
                const dragging = draggingNodeRef.current?.id === node.id;

                // Setting the fx/fy properties of a node tells the simulation to "fix"
                // the node at that position and ignore any forces that would normally
                // cause it to move.
                if (dragging) {
                    nodes[i].fx = draggingNodeRef.current.position.x;
                    nodes[i].fy = draggingNodeRef.current.position.y;
                } else {
                    delete nodes[i].fx;
                    delete nodes[i].fy;
                }
            });

            simulation.tick();
            setNodes(
                nodes.map((node) => ({
                    ...node,
                    position: { x: node.fx ?? node.x, y: node.fy ?? node.y },
                })),
            );

            window.requestAnimationFrame(() => {
                // Give React and React Flow a chance to update and render the new node
                // positions before we fit the viewport to the new layout.
                fitView();

                // If the simulation hasn't been stopped, schedule another tick.
                if (running) tick();
            });
        };

        const toggle = () => {
            if (!running) {
                getNodes().forEach((node, index) => {
                    let simNode = nodes[index];
                    Object.assign(simNode, node);
                    simNode.x = node.position.x;
                    simNode.y = node.position.y;
                });
            }
            running = !running;
            running && window.requestAnimationFrame(tick);
        };

        const isRunning = () => running;

        return [true, { toggle, isRunning }, dragEvents];
    }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView]);
};

const LayoutFlow = (props) => {
    const {root, newNode, setNewNode, lastNode, oldId} = useContext(Context);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const { getEdges, getNodes, deleteElements } = useReactFlow();
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [initialized, { toggle, isRunning }, dragEvents] =
        useLayoutedElements();

    const [showDelayedText, setShowDelayedText] =
        useState(false);

    const handleClick = () => {
        setTimeout(() => {
            setShowDelayedText(true);
        }, 1000);
    };

    const onConnect = useCallback(
        (edgeMake) => {
            setEdges((oldEdges) => addEdge(edgeMake, oldEdges));
        },
        [setEdges],
    );

    const updateNodeInternals = useUpdateNodeInternals();
    const [handleCount, setHandleCount] = useState(0);
    let id = "";
    const addHandleCount = useCallback(() => {
        setHandleCount(handleCount + 1);
        updateNodeInternals(id);
    }, [id, updateNodeInternals]);

    const store = useStoreApi();
    const { zoomIn, zoomOut, setCenter } = useReactFlow();

    let xpos = 0;
    let ypos = 0;
    let oldNode = null;

        const { nodeLookup } = store.getState();
        const nodesSpot = Array.from(nodeLookup).map(([, node]) => node);
        if (nodesSpot.length > 0 && oldId) {
            for (let i = 0; i < nodesSpot.length; i++) {
                if (nodesSpot[i].data.value.id == oldId){
                    oldNode = nodesSpot[i];
                }
            }

            xpos = oldNode.position.x;
            ypos = oldNode.position.y;

        }
    if (!firstMade) {
        var nodeMake = {
            id: "1",
            type: 'article',
            data: { value: root },
            position: { x: 300, y: 200 },
        }
        setNodes((prevNodes) => prevNodes.concat(nodeMake));
        localNodes ++;
        firstMade = true;
    }

    if (newNode >= localNodes) {
        var nodeMake = {
            id: (localNodes + 1) + "",
            type: 'article',
            data: {value: root},
            position: {x: xpos + 80, y: ypos - 80}
        }

        var edgeMake = {
            source: oldNode.id,
            target: nodeMake.id,
        }
        addHandleCount(oldNode.id);
        setNodes((prevNodes) => prevNodes.concat(nodeMake));
        onConnect(edgeMake);
        localNodes++;

    }

    return (
        <div style={{width: '80vw', height: '60vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeDragStart={dragEvents.start}
                onNodeDrag={dragEvents.drag}
                onNodeDragStop={dragEvents.stop}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
            >
                <Controls/>
                <Background variant="dots" gap={12} size={1}/>
                <Panel>
                    {initialized && (
                        <div className="physics">
                            {toggle()}
                        </div>
                    )}
                </Panel>
            </ReactFlow>
        </div>
    );
};

function renderWeb() {
    return (
        <ReactFlowProvider>
            <LayoutFlow />
        </ReactFlowProvider>
    );
}

export default renderWeb;