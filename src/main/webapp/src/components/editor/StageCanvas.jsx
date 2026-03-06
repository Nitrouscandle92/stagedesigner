import React, { useState, useRef, useCallback } from 'react';
import {
    ReactFlow, addEdge, Background, Controls, useReactFlow,
    applyNodeChanges, applyEdgeChanges, Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CableEdge from '../edges/CableEdge';
import AcousticNode from '../nodes/AcousticNode';
import MonitorNode from '../nodes/MonitorNode';
import StageboxNode from '../nodes/StageboxNode';
import MixerNode from '../nodes/MixerNode';
import LightingNode from '../nodes/LightingNode';
import PowerNode from '../nodes/PowerNode';
import BacklineNode from '../nodes/BacklineNode';
import StageBoundaryNode from '../nodes/StageBoundaryNode';
import DrumNode from '../nodes/DrumNode';
import SpeakerSystemNode from '../nodes/SpeakerSystemNode';
import RackNode from '../nodes/RackNode';
import CrossoverNode from '../nodes/CrossoverNode';
import DIBoxNode from '../nodes/DIBoxNode';
import AmpNode from '../nodes/AmpNode';
import StageSetupModal from './StageSetupModal';
import NodeConfigModal from './NodeConfigModal';
import { useScaling } from '../../hooks/useScaling';
import WirelessReceiverNode from "../nodes/WirelessReceiverNode";
import DI800Node from "../nodes/DIBoxNode";
import VocalMicNode from '../nodes/VocalMicNode';
import ChoirMicNode from '../nodes/ChoirMicNode';
import PulpitMicNode from '../nodes/PulpitMicNode';
import WirelessMicNode from '../nodes/WirelessMicNode';
import GrandPianoNode from '../nodes/GrandPianoNode';
import EPianoNode from '../nodes/EPianoNode';
import UprightPianoNode from '../nodes/UprightPianoNode';
import ChairNode from '../nodes/ChairNode';
import MusicStandNode from '../nodes/MusicStandNode';
import EGuitarNode from '../nodes/EGuitarNode';
import EBassNode from '../nodes/EBassNode';
import AcousticGuitarNode from '../nodes/AcousticGuitarNode';
import {
    ViolinNode, CelloNode, TrumpetNode, TromboneNode, FrenchHornNode,
    SaxophoneNode, FluteNode, CajonNode, KazooNode, SteelDrumNode,
    GlockenspielNode, TriangleNode
} from '../nodes/InstrumentNode';
import ArriControllerNode from "../nodes/ArriControllerNode";
import DmxControllerNode from "../nodes/DmxControllerNode";
import RgbSpotNode from "../nodes/RgbSpotNode";
import ArriSpotNode from "../nodes/ArriSpotNode";
import MovingHeadNode from "../nodes/MovingHeadNode";
import LightStandNode from "../nodes/LightStandNode";

const nodeTypes = {
    acoustic: AcousticNode,
    monitor: MonitorNode,
    stagebox: StageboxNode,
    mixer: MixerNode,
    lighting: LightingNode,
    power: PowerNode,
    backline: BacklineNode,
    stageBoundary: StageBoundaryNode,
    drum: DrumNode,
    speaker: SpeakerSystemNode,
    rack: RackNode,
    crossover: CrossoverNode,
    di: DIBoxNode,
    amp: AmpNode,
    wireless_receiver: WirelessReceiverNode,
    di800: DI800Node,
    vocal_mic: VocalMicNode,
    choir_mic: ChoirMicNode,
    pulpit_mic: PulpitMicNode,
    wireless_mic: WirelessMicNode,
    grand_piano: GrandPianoNode,
    epiano: EPianoNode,
    upright_piano: UprightPianoNode,
    chair: ChairNode,
    music_stand: MusicStandNode,
    eguitar: EGuitarNode,
    ebass: EBassNode,
    acoustic_guitar: AcousticGuitarNode,
    violin: ViolinNode,
    cello: CelloNode,
    trumpet: TrumpetNode,
    trombone: TromboneNode,
    frenchhorn: FrenchHornNode,
    saxophone: SaxophoneNode,
    flute: FluteNode,
    cajon: CajonNode,
    kazoo: KazooNode,
    steeldrum: SteelDrumNode,
    glockenspiel: GlockenspielNode,
    triangle: TriangleNode,
    light_stand: LightStandNode,
    moving_head: MovingHeadNode,
    arri_spot: ArriSpotNode,
    rgb_spot: RgbSpotNode,
    dmx_controller: DmxControllerNode,
    arri_controller: ArriControllerNode,
};

const edgeTypes = {
    cable: CableEdge,
};

const StageCanvas = ({ nodes, setNodes, edges, setEdges, stageConfig, setStageConfig, setCurrentStageId }) => {
    const reactFlowWrapper = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [configNode, setConfigNode] = useState(null);

    const { screenToFlowPosition, getNode } = useReactFlow();
    const { toPixels } = useScaling();

    const createBoundaryNode = useCallback((width, depth, label) => ({
        id: 'stage-boundary',
        type: 'stageBoundary',
        position: { x: 0, y: 0 },
        data: { width: toPixels(width), height: toPixels(depth), label },
        draggable: false,
        selectable: false,
        zIndex: -1
    }), [toPixels]);

    const getTargetStand = useCallback((draggedNode) => {
        const SNAPPING_DISTANCE = 100;
        return nodes.find(n => {
            if (n.type !== 'light_stand' || n.id === draggedNode.id) return false;
            const dx = n.position.x + 70 - draggedNode.position.x;
            const dy = n.position.y + 20 - draggedNode.position.y;
            return Math.hypot(dx, dy) < SNAPPING_DISTANCE;
        });
    }, [nodes]);

    const handleSetupComplete = (config) => {
        setStageConfig(config);
        setNodes([createBoundaryNode(config.widthMeters, config.depthMeters, config.name)]);
    };

    const handleStageSizeChange = (dimension, value) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) return;

        setStageConfig(prev => {
            const newConfig = { ...prev, [dimension]: numValue };

            setNodes(nds => nds.map(n => {
                if (n.id === 'stage-boundary') {
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            width: toPixels(dimension === 'widthMeters' ? numValue : newConfig.widthMeters),
                            height: toPixels(dimension === 'depthMeters' ? numValue : newConfig.depthMeters)
                        }
                    };
                }
                return n;
            }));

            return newConfig;
        });
    };

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

    const onConnect = useCallback((params) => setEdges((eds) => {
        const isOccupied = eds.some(edge =>
            edge.source === params.source && edge.sourceHandle === params.sourceHandle
        );

        if (isOccupied) {
            alert("This output is already in use.");
            return eds;
        }

        const getHandleType = (handleId) => {
            if (!handleId) return 'unknown';
            if (handleId.includes('power')) return 'power';
            if (handleId.includes('spk')) return 'spk';
            if (handleId.includes('xlr') || handleId.includes('mic') || handleId.includes('main')) return 'xlr';
            if (handleId.includes('inst') || handleId.includes('jack') || handleId.includes('-l') || handleId.includes('-r')) return 'inst';
            if (handleId.includes('rf')) return 'rf';
            return 'unknown';
        };

        const sourceType = getHandleType(params.sourceHandle);
        const targetType = getHandleType(params.targetHandle);

        if (sourceType !== targetType && sourceType !== 'unknown' && targetType !== 'unknown') {
            alert(`Mismatch: You cannot plug a ${sourceType.toUpperCase()} cable into a ${targetType.toUpperCase()} port!`);
            return eds;
        }

        const colorSpectrums = {
            xlr: ['#2563eb', '#3b82f6', '#60a5fa', '#1d4ed8', '#1e40af'],
            inst: ['#9333ea', '#a855f7', '#c084fc', '#7e22ce', '#6b21a8'],
            spk: ['#ea580c', '#f97316', '#fb923c', '#c2410c', '#9a3412'],
            power: ['#ca8a04', '#eab308', '#facc15', '#a16207', '#854d0e'],
            rf: ['#d946ef', '#e879f9', '#c026d3'],
            unknown: ['#9ca3af', '#6b7280']
        };

        const typeCount = eds.filter(e => getHandleType(e.sourceHandle) === sourceType).length;
        const spectrum = colorSpectrums[sourceType] || colorSpectrums.unknown;
        const cableColor = spectrum[typeCount % spectrum.length];

        const targetEdgesCount = eds.filter(e => e.target === params.target).length;
        const baseSpacing = 15;
        const multiplier = Math.ceil(targetEdgesCount / 2) * (targetEdgesCount % 2 === 0 ? 1 : -1);
        const calculatedOffset = multiplier * baseSpacing;

        return addEdge({
            ...params,
            type: 'cable',
            zIndex: 50,
            animated: sourceType === 'rf',
            data: { offset: calculatedOffset },
            style: { stroke: cableColor }
        }, eds);
    }), [setEdges]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeDragStop = useCallback((event, draggedNode) => {
        if (!['moving_head', 'arri_spot', 'rgb_spot'].includes(draggedNode.type)) return;

        const stand = getTargetStand(draggedNode);

        if (stand) {
            const isLeft = draggedNode.position.x < (stand.position.x + 70);
            const relativeX = isLeft ? -10 : 70;
            const relativeY = -35;

            setNodes((nds) => {
                const otherNodes = nds.filter(n => n.id !== draggedNode.id);
                const updatedNode = {
                    ...draggedNode,
                    parentNode: stand.id,
                    position: { x: relativeX, y: relativeY },
                    extent: 'parent',
                    zIndex: 1000
                };
                return [...otherNodes, updatedNode];
            });
        } else if (draggedNode.parentNode) {
            const parent = getNode(draggedNode.parentNode);
            if (parent) {
                setNodes((nds) => nds.map(n => {
                    if (n.id === draggedNode.id) {
                        return {
                            ...n,
                            parentNode: undefined,
                            extent: undefined,
                            position: {
                                x: n.position.x + parent.position.x,
                                y: n.position.y + parent.position.y
                            }
                        };
                    }
                    return n;
                }));
            }
        }
    }, [getTargetStand, setNodes, getNode]);

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('application/@xyflow/react');
        const label = event.dataTransfer.getData('application/label');
        const category = event.dataTransfer.getData('application/category');

        if (!type) return;

        let position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
        const stand = getTargetStand({ position, type });

        let nodeData = {
            id: `node_${Date.now()}`,
            type,
            position,
            data: { label, category, configuration: {} },
        };

        if (stand && ['moving_head', 'arri_spot', 'rgb_spot'].includes(type)) {
            const isLeft = position.x < (stand.position.x + 70);
            nodeData = {
                ...nodeData,
                parentNode: stand.id,
                position: { x: isLeft ? -10 : 70, y: -35 },
                extent: 'parent',
                zIndex: 1000
            };
        }

        setNodes((nds) => nds.concat(nodeData));
    }, [screenToFlowPosition, nodes, setNodes, getTargetStand]);

    const onNodeDoubleClick = useCallback((event, node) => {
        if (node.type !== 'stageBoundary') {
            setConfigNode(node);
        }
    }, []);

    const handleConfigSave = (nodeId, newConfig) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: { ...node.data, configuration: newConfig },
                    };
                }
                return node;
            })
        );
        setConfigNode(null);
    };

    if (isLoading) return <div className="flex h-full items-center justify-center text-white bg-zinc-900">Loading...</div>;

    return (
        <div className="flex-grow h-full relative" ref={reactFlowWrapper}>
            {!stageConfig && <StageSetupModal onComplete={handleSetupComplete} />}

            {configNode && (
                <NodeConfigModal
                    node={configNode}
                    onClose={() => setConfigNode(null)}
                    onSave={handleConfigSave}
                />
            )}

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDragStop={onNodeDragStop}
                onNodeDoubleClick={onNodeDoubleClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                connectOnClick={true}
                connectionRadius={45}
            >
                <Background color="#18181b" gap={20} />
                <Controls />

                {stageConfig && (
                    <Panel position="top-left" className="bg-zinc-900 border border-zinc-700 p-3 rounded-md shadow-lg flex gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Width (m)</label>
                            <input
                                type="number"
                                min="1"
                                step="0.5"
                                value={stageConfig.widthMeters}
                                onChange={(e) => handleStageSizeChange('widthMeters', e.target.value)}
                                className="w-16 bg-zinc-800 text-white border border-zinc-600 rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Depth (m)</label>
                            <input
                                type="number"
                                min="1"
                                step="0.5"
                                value={stageConfig.depthMeters}
                                onChange={(e) => handleStageSizeChange('depthMeters', e.target.value)}
                                className="w-16 bg-zinc-800 text-white border border-zinc-600 rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
                            />
                        </div>
                    </Panel>
                )}
            </ReactFlow>
        </div>
    );
};

export default StageCanvas;