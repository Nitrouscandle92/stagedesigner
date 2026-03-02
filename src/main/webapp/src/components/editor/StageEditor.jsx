import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { toJpeg } from 'html-to-image';
import Sidebar from '../sidebar/Sidebar';
import StageCanvas from './StageCanvas';
import { exportStagePdf } from '../../api/stageService';

const StageEditor = () => {
    const stageId = 1;

    const handleSave = async () => {

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
                link.download = `Stageplot_Ansicht.jpg`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleExportPdfClick = async () => {
        try {
            await handleSave();
            await exportStagePdf(stageId);
        } catch (error) {
            alert("Error exporting PDF");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-950">
            <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
                <div className="text-white font-bold">Stage Designer Pro</div>

                <div className="flex items-center gap-3">
                    <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-sm text-sm font-medium transition-colors">
                        Speichern
                    </button>

                    <div className="w-px h-6 bg-zinc-700 mx-1" />

                    <button
                        onClick={handleExportJpeg}
                        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded-sm text-sm transition-colors flex items-center gap-2"
                    >
                        ️ Export JPEG
                    </button>

                    <button
                        onClick={handleExportPdfClick}
                        className="bg-red-900/50 hover:bg-red-800/80 border border-red-800 text-red-200 px-4 py-1.5 rounded-sm text-sm transition-colors flex items-center gap-2"
                    >
                         Patchlist (PDF)
                    </button>
                </div>
            </div>

            <div className="flex flex-1 w-full overflow-hidden relative">
                <ReactFlowProvider>
                    <Sidebar />
                    <StageCanvas />
                </ReactFlowProvider>
            </div>
        </div>
    );
};

export default StageEditor;