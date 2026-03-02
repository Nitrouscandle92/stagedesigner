import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import { saveStage, getStage, exportStagePdf } from '../../api/stageService';
import { useScaling } from '../../hooks/useScaling';
import WirelessReceiverNode from "../nodes/WirelessReceiverNode";
import InstrumentNode from "../nodes/InstrumentNode";
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
    instrument: InstrumentNode,
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
};

const edgeTypes = {
    cable: CableEdge,
};

const StageCanvas = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [stageConfig, setStageConfig] = useState(null);
    const [currentStageId, setCurrentStageId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [configNode, setConfigNode] = useState(null);

    const { screenToFlowPosition } = useReactFlow();
    const { toMeters, toPixels } = useScaling();

    const createBoundaryNode = useCallback((width, depth, label) => ({
        id: 'stage-boundary',
        type: 'stageBoundary',
        position: { x: 0, y: 0 },
        data: { width: toPixels(width), height: toPixels(depth), label },
        draggable: false,
        selectable: false,
        zIndex: -1
    }), [toPixels]);

    useEffect(() => {
        const loadInitialStage = async () => {
            try {
                const stageData = await getStage(1);
                if (stageData) {
                    setCurrentStageId(stageData.id);
                    setStageConfig({ name: stageData.name, widthMeters: stageData.widthMeters, depthMeters: stageData.depthMeters });

                    const loadedNodes = stageData.elements.map(el => ({
                        id: el.id,
                        type: el.category.toLowerCase(),
                        position: { x: toPixels(el.x), y: toPixels(el.y) },
                        data: { label: el.label, category: el.category, configuration: el.configuration }
                    }));

                    const boundary = createBoundaryNode(stageData.widthMeters, stageData.depthMeters, stageData.name);
                    setNodes([boundary, ...loadedNodes]);

                    const loadedEdges = stageData.connections.map(conn => ({
                        id: `edge_${conn.id}`,
                        source: conn.sourceId,
                        target: conn.targetId,
                        animated: true,
                        style: { strokeWidth: 2, stroke: conn.hexColor || '#3b82f6' }
                    }));
                    setEdges(loadedEdges);
                }
            } catch (error) {
                console.log('Starting fresh layout.');
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialStage();
    }, [toPixels, createBoundaryNode]);

    const handleSetupComplete = (config) => {
        setStageConfig(config);
        setNodes([createBoundaryNode(config.widthMeters, config.depthMeters, config.name)]);
    };

    // Handle dynamic stage size updates from the UI panel
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

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

    const onConnect = useCallback((params) => setEdges((eds) => {
        // 1. Check if the port is already occupied
        const isOccupied = eds.some(edge =>
            edge.source === params.source && edge.sourceHandle === params.sourceHandle
        );

        if (isOccupied) {
            alert("This output is already in use.");
            return eds;
        }

        // 2. Identify connection types for validation
        const getHandleType = (handleId) => {
            if (!handleId) return 'unknown';
            if (handleId.includes('xlr') || handleId.includes('mic') || handleId.includes('main')) return 'xlr';
            if (handleId.includes('inst') || handleId.includes('jack') || handleId.includes('l') || handleId.includes('r')) return 'inst';
            if (handleId.includes('spk')) return 'spk';
            if (handleId.includes('power')) return 'power';
            if (handleId.includes('rf')) return 'rf';
            return 'unknown';
        };

        const sourceType = getHandleType(params.sourceHandle);
        const targetType = getHandleType(params.targetHandle);

        // 3. Strict Validation Rule (e.g. No XLR in Klinke)
        if (sourceType !== targetType && sourceType !== 'unknown' && targetType !== 'unknown') {
            alert(`Mismatch: You cannot plug a ${sourceType.toUpperCase()} cable into a ${targetType.toUpperCase()} port!`);
            return eds;
        }

        // 4. Color Spectrums
        const colorSpectrums = {
            xlr: ['#2563eb', '#3b82f6', '#60a5fa', '#1d4ed8', '#1e40af'], // Blues
            inst: ['#9333ea', '#a855f7', '#c084fc', '#7e22ce', '#6b21a8'], // Purples
            spk: ['#ea580c', '#f97316', '#fb923c', '#c2410c', '#9a3412'], // Oranges
            power: ['#ca8a04', '#eab308', '#facc15', '#a16207', '#854d0e'], // Yellows
            rf: ['#d946ef', '#e879f9', '#c026d3'], // Magentas
            unknown: ['#9ca3af', '#6b7280'] // Grays
        };

        const typeCount = eds.filter(e => getHandleType(e.sourceHandle) === sourceType).length;
        const spectrum = colorSpectrums[sourceType] || colorSpectrums.unknown;
        const cableColor = spectrum[typeCount % spectrum.length];

        const targetEdgesCount = eds.filter(e => e.target === params.target).length;

        const baseSpacing = 15;
        const multiplier = Math.ceil(targetEdgesCount / 2) * (targetEdgesCount % 2 === 0 ? 1 : -1);
        const calculatedOffset = multiplier * baseSpacing;

        // 6. Create the Edge
        return addEdge({
            ...params,
            type: 'cable',
            zIndex: 50,
            animated: sourceType === 'rf',
            data: { offset: calculatedOffset },
            style: {
                stroke: cableColor
            }
        }, eds);
    }), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('application/@xyflow/react');
        const label = event.dataTransfer.getData('application/label');
        const category = event.dataTransfer.getData('application/category');

        if (!type) return;

        let position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        let parentNodeId = null;
        const targetRack = nodes.find(n =>
            n.type === 'rack' &&
            position.x >= n.position.x && position.x <= n.position.x + 192 &&
            position.y >= n.position.y && position.y <= n.position.y + 256
        );

        if (targetRack && type === 'mic') {
            parentNodeId = targetRack.id;
            position = {
                x: position.x - targetRack.position.x,
                y: position.y - targetRack.position.y
            };
        }

        const newNode = {
            id: `node_${Date.now()}`,
            type,
            position,
            data: { label, category, configuration: {} },
            ...(parentNodeId && { parentNode: parentNodeId, extent: 'parent' })
        };

        setNodes((nds) => nds.concat(newNode));
    }, [screenToFlowPosition, nodes]);

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

    const handleSave = async () => {
        if (!stageConfig) return;

        const exportableNodes = nodes.filter(n => n.id !== 'stage-boundary');

        const payload = {
            id: currentStageId,
            name: stageConfig.name,
            widthMeters: stageConfig.widthMeters,
            depthMeters: stageConfig.depthMeters,
            elements: exportableNodes.map(n => ({
                id: n.id,
                label: n.data.label,
                category: n.type.toUpperCase(),
                x: toMeters(n.position.x),
                y: toMeters(n.position.y),
                width: toMeters(100), // Consider calculating actual width/height based on node dimensions if needed backend-side
                height: toMeters(50),
                configuration: n.data.configuration || {}
            })),
            connections: edges.map(e => {
                const sourceNode = nodes.find(n => n.id === e.source);
                return {
                    id: e.id.includes('edge_') ? e.id.replace('edge_', '') : null,
                    sourceId: e.source,
                    targetId: e.target,
                    type: sourceNode?.data?.category || 'AUDIO'
                };
            })
        };

        try {
            const savedStage = await saveStage(payload);
            setCurrentStageId(savedStage.id);
            alert('Saved! Configurations and colors synced.');
        } catch (error) {
            console.error('Save failed', error);
        }
    };

    const handleExportPdf = async () => {
        if (!currentStageId) {
            alert("Please save the stage first before exporting.");
            return;
        }
        try {
            const pdfBlob = await exportStagePdf(currentStageId);
            const url = window.URL.createObjectURL(new Blob([pdfBlob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `StagePlot_${stageConfig.name.replace(/\s+/g, '_')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('PDF export failed', error);
            alert('Error exporting PDF.');
        }
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
                onNodeDoubleClick={onNodeDoubleClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
            >
                <Background color="#18181b" gap={20} />
                <Controls />

                {/* Stage Dimensions Control Panel */}
                {stageConfig && (
                    <Panel position="top-left" className="bg-zinc-900 border border-zinc-700 p-3 rounded-md shadow-lg flex gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Breite (m)</label>
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
                            <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Tiefe (m)</label>
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

                <Panel position="top-right" className="flex gap-2">
                    <button onClick={handleExportPdf} className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-white px-4 py-2 rounded-md font-bold text-sm shadow-lg transition-colors">
                        Export PDF
                    </button>
                    <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold text-sm shadow-lg transition-colors">
                        Save Setup
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default StageCanvas;