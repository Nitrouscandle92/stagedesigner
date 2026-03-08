import React, { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { toJpeg } from 'html-to-image';
import Sidebar from '../sidebar/Sidebar';
import StageCanvas from './StageCanvas';
import { saveStage, getStageById } from '../../api/stageService';
import { exportPatchlistPdf } from '../../api/pdfExportService';
import StageLoadModal from './StageLoadModal';

const StageEditor = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [stageConfig, setStageConfig] = useState(null);
    const [currentStageId, setCurrentStageId] = useState(null);
    const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

    const handleSave = async () => {
        if (!stageConfig) {
            alert("Please create a stage first.");
            return false;
        }

        const exportableNodes = nodes.filter(n => n.id !== 'stage-boundary');

        const payload = {
            id: currentStageId,
            version: stageConfig?.version,
            name: stageConfig.name,
            widthMeters: parseFloat(stageConfig.widthMeters),
            depthMeters: parseFloat(stageConfig.depthMeters),
            elements: exportableNodes.map(n => ({
                id: n.id,
                label: n.data.label || n.type,
                category: n.data.category || n.type.toUpperCase(),
                x: n.position.x / 50,
                y: n.position.y / 50,
                width: 1.0,
                height: 1.0,
                configuration: {
                    ...(n.data.configuration || {}),
                    nodeType: n.type
                }
            })),
            connections: edges.map(e => {
                const sourceNode = nodes.find(n => n.id === e.source);

                let mappedType = 'AUDIO';
                if (sourceNode?.type === 'power') {
                    mappedType = 'POWER';
                } else if (sourceNode?.type === 'lighting') {
                    mappedType = 'LIGHTING';
                }

                let connectionId = null;
                if (e.id && e.id.startsWith('edge_')) {
                    const parsed = parseInt(e.id.replace('edge_', ''), 10);
                    if (!isNaN(parsed)) connectionId = parsed;
                }

                return {
                    id: connectionId,
                    sourceId: e.source,
                    targetId: e.target,
                    type: mappedType
                };
            })
        };

        try {
            const savedStage = await saveStage(payload);
            setCurrentStageId(savedStage.id);
            setStageConfig(savedStage);
            alert(`Successfully saved! ${exportableNodes.length} elements on the stage.`);
            return true;
        } catch (error) {
            console.error('Error saving:', error.response?.data || error.message);
            alert('Saving failed. Check the console for details.');
            return false;
        }
    };

    const handleLoadStage = async (id, asTemplate) => {
        try {
            const data = await getStageById(id);

            setStageConfig({
                name: asTemplate ? `${data.name} (Copy)` : data.name,
                widthMeters: data.widthMeters,
                depthMeters: data.depthMeters,
                version: asTemplate ? null : data.version
            });

            setCurrentStageId(asTemplate ? null : data.id);

            const loadedNodes = (data.elements || []).map(el => {
                let exactType = el.configuration?.nodeType;

                if (!exactType) {
                    const rawFallback = el.label.toLowerCase().replace(/[\s-]/g, '_');
                    const fallbackMap = {
                        'e_bass': 'ebass',
                        'e_guitar': 'eguitar',
                        'di_box': 'di800',
                        'acoustic_guitar': 'acoustic_guitar'
                    };
                    exactType = fallbackMap[rawFallback] || rawFallback;
                }

                return {
                    id: el.id,
                    type: exactType,
                    position: { x: el.x * 50, y: el.y * 50 },
                    data: {
                        label: el.label,
                        category: el.category,
                        configuration: el.configuration || {}
                    }
                };
            });

            const boundaryNode = {
                id: 'stage-boundary',
                type: 'stageBoundary',
                position: { x: 0, y: 0 },
                data: {
                    width: data.widthMeters * 250,
                    height: data.depthMeters * 250,
                    label: data.name
                },
                draggable: false,
                selectable: false,
                zIndex: -1
            };

            setNodes([boundaryNode, ...loadedNodes]);

            const loadedEdges = (data.connections || []).map(conn => ({
                id: conn.id ? `edge_${conn.id}` : `edge_${conn.sourceId}_${conn.targetId}`,
                source: conn.sourceId,
                target: conn.targetId,
                type: 'cable',
                data: { cableType: conn.type }
            }));

            setEdges(loadedEdges);
            setIsLoadModalOpen(false);

        } catch (error) {
            console.error("Failed to load stage data", error);
            alert("Error loading stage data.");
        }
    };

    const handleExportPdf = () => {
        if (!stageConfig) {
            alert("No stage configuration found.");
            return;
        }
        exportPatchlistPdf(stageConfig.name, nodes, edges);
    };

    const handleExportJpeg = () => {
        const flowElement = document.querySelector('.react-flow__viewport');
        if (!flowElement) return;

        toJpeg(flowElement, {
            quality: 0.95,
            backgroundColor: '#18181b',
            pixelRatio: 2,
            skipFonts: true
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `Stageplot_View.jpg`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-950">
            <StageLoadModal
                isOpen={isLoadModalOpen}
                onClose={() => setIsLoadModalOpen(false)}
                onLoad={handleLoadStage}
            />

            <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 z-50">
                <div className="text-white font-bold">Stage Designer Pro</div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsLoadModalOpen(true)}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-1.5 rounded-sm text-sm font-medium transition-colors"
                    >
                        Load / Templates
                    </button>

                    <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-sm text-sm font-medium transition-colors">
                        Save
                    </button>

                    <div className="w-px h-6 bg-zinc-700 mx-1" />

                    <button
                        onClick={handleExportPdf}
                        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded-sm text-sm transition-colors flex items-center gap-2"
                    >
                        Export PDF (Patchlist)
                    </button>

                    <button
                        onClick={handleExportJpeg}
                        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded-sm text-sm transition-colors flex items-center gap-2"
                    >
                        Export JPEG
                    </button>
                </div>
            </div>

            <div className="flex flex-1 w-full overflow-hidden relative">
                <ReactFlowProvider>
                    <Sidebar />
                    <StageCanvas
                        nodes={nodes} setNodes={setNodes}
                        edges={edges} setEdges={setEdges}
                        stageConfig={stageConfig} setStageConfig={setStageConfig}
                        setCurrentStageId={setCurrentStageId}
                    />
                </ReactFlowProvider>
            </div>
        </div>
    );
};

export default StageEditor;