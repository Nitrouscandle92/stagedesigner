import React, { useState } from 'react';

const StageSetupModal = ({ onComplete }) => {
    const [name, setName] = useState('Main Stage');
    const [width, setWidth] = useState(12.0);
    const [depth, setDepth] = useState(8.0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete({ name, widthMeters: parseFloat(width), depthMeters: parseFloat(depth) });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-2xl w-96 text-white">
                <h2 className="text-xl font-bold mb-4">New Stage Setup</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Project Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm focus:border-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Width (m)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="1"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm focus:border-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Depth (m)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="1"
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm focus:border-blue-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Create Stage
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StageSetupModal;