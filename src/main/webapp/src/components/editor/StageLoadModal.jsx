import React, { useState, useEffect } from 'react';
import { getAllStages } from '../../api/stageService';

const StageLoadModal = ({ isOpen, onClose, onLoad }) => {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchStages();
        }
    }, [isOpen]);

    const fetchStages = async () => {
        setLoading(true);
        try {
            const data = await getAllStages();
            setStages(data);
        } catch (error) {
            console.error("Failed to fetch stages", error);
            alert("Could not load stages. Check console.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-2xl w-[500px] max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-2">
                    <h2 className="text-lg font-bold text-white">Load Stage Template</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white text-xl">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    {loading ? (
                        <div className="text-center text-zinc-400 py-4">Loading templates...</div>
                    ) : stages.length === 0 ? (
                        <div className="text-center text-zinc-400 py-4">No saved stages found.</div>
                    ) : (
                        <div className="space-y-2">
                            {stages.map((stage) => (
                                <div key={stage.id} className="flex items-center justify-between p-3 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-750 transition-colors">
                                    <div>
                                        <div className="text-white font-medium">{stage.name}</div>
                                        <div className="text-xs text-zinc-400">
                                            {stage.widthMeters}m x {stage.depthMeters}m • {stage.elements?.length || 0} Elements
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onLoad(stage.id, true)}
                                            className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-xs text-white rounded transition-colors"
                                            title="Load as a new, unsaved template"
                                        >
                                            Use as Template
                                        </button>
                                        <button
                                            onClick={() => onLoad(stage.id, false)}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-xs text-white rounded transition-colors"
                                            title="Load and continue editing this stage"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StageLoadModal;