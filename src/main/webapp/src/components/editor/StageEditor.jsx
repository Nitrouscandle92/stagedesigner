import React, { useState, useCallback } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { toJpeg } from 'html-to-image';
import Sidebar from '../sidebar/Sidebar';
import StageCanvas from './StageCanvas';
import { saveStage, exportStagePdf } from '../../api/stageService';

const StageEditor = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [stageConfig, setStageConfig] = useState({ name: 'Main Stage', widthMeters: 8, depthMeters: 4 });
    const [currentStageId, setCurrentStageId] = useState(null);

    const handleSave = async () => {
        // Force conversion to numbers to ensure backend receives correct types
        const width = parseFloat(stageConfig.widthMeters);
        const depth = parseFloat(stageConfig.depthMeters);

        const payload = {
            // Use currentStageId if it exists, otherwise the backend generates one
            id: currentStageId,
            name: stageConfig.name,
            widthMeters: width,
            depthMeters: depth,
            elements: nodes
                .filter(n => n.id !== 'stage-boundary')
                .map(n => ({
                    id: n.id,
                    label: n.data.label || 'Unnamed',
                    category: (n.data.category || 'AUDIO').toUpperCase(),
                    x: n.position.x,
                    y: n.position.y,
                    configuration: n.data.configuration || {}
                })),
            connections: edges.map(e => ({
                sourceId: e.source,
                targetId: e.target,
                type: 'AUDIO'
            }))
        };

        try {
            const saved = await saveStage(payload);
            setCurrentStageId(saved.id);
            alert(`Successfully saved ${payload.elements.length} elements on a ${width}x${depth}m stage.`);
            return true;
        } catch (error) {
            console.error('Save error:', error.response?.data);
            alert('Save failed. Check console for details.');
            return false;
        }
    };
    const handleExportJpeg = () => {
        const flowElement = document.querySelector('.react-flow');
        if (!flowElement) return;

        toJpeg(flowElement, {
            quality: 0.95,
            backgroundColor: '#18181b',
            pixelRatio: 2
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `StagePlot_${stageConfig.name}.jpg`;
                link.href = dataUrl;
                link.click();
            });
    };

    const handleExportPdfClick = async () => {
        const savedId = await handleSave();
        if (savedId) {
            try {
                await exportStagePdf(savedId);
            } catch (error) {
                alert("PDF Export failed.");
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-950 text-white">
            <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">S</div>
                    <span className="font-bold tracking-tight">STAGE DESIGNER PRO</span>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded text-sm font-bold transition-colors shadow-lg">
                        Save Changes
                    </button>

                    <div className="w-px h-6 bg-zinc-700 mx-1" />

                    <button onClick={handleExportJpeg} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded text-sm transition-colors">
                        Export JPEG
                    </button>

                    <button onClick={handleExportPdfClick} className="bg-red-900/40 hover:bg-red-800/60 border border-red-900/50 text-red-200 px-4 py-1.5 rounded text-sm transition-colors">
                        Export PDF
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                <ReactFlowProvider>
                    <Sidebar />
                    <StageCanvas
                        nodes={nodes} setNodes={setNodes}
                        edges={edges} setEdges={setEdges}
                        stageConfig={stageConfig} setStageConfig={setStageConfig}
                    />
                </ReactFlowProvider>
            </div>
        </div>
    );
};

export default StageEditor;