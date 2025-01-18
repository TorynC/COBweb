import {
    forceSimulation,
    forceLink,
    forceManyBody,
    forceX,
    forceY,
    forceCollide
} from 'd3-force';
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
    useNodesInitialized,
    Controls,
    Background
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import ArticleNode from "./ArticleNode.jsx";
import Article from "./Article.jsx";
import {Context} from "./context/Context.jsx";

const initialNodes = [
    {
        id: '1',
        type: 'article',
        position: { x: 0, y: 0 },
        data: { value: root },
    },

    {
        id: '2',
        type: 'article',
        position: { x: 0, y: 0 },
        data: { value: new Article("zz", "zz", "zzz") },
    }
];

const nodeTypes = { article: ArticleNode };

const initialEdges = [];

const simulation = forceSimulation()
    .force('charge', forceManyBody().strength(-1000))
    .force('x', forceX().x(0).strength(0.05))
    .force('y', forceY().y(0).strength(0.05))
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
            forceLink(edges)
                .id((d) => d.id)
                .strength(0.05)
                .distance(100),
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

const LayoutFlow = () => {
    const {root} = useContext(Context);
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    const [initialized, { toggle, isRunning }, dragEvents] =
        useLayoutedElements();

    return (
        <div style={{width: '80vw', height: '80vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeDragStart={dragEvents.start}
                onNodeDrag={dragEvents.drag}
                onNodeDragStop={dragEvents.stop}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
            >
                <Controls/>
                <Background variant="dots" gap={12} size={1}/>
                <Panel>
                    {initialized && (
                        <button onClick={toggle}>
                            {isRunning() ? 'Stop' : 'Start'} force simulation
                        </button>
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