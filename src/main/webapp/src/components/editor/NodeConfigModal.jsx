import React, { useState } from 'react';

const NodeConfigModal = ({ node, onClose, onSave }) => {
    const [config, setConfig] = useState(node.data.configuration || {});

    const handleSave = (e) => {
        e.preventDefault();
        onSave(node.id, config);
    };

    const needsChannelPatch = [
        'eguitar', 'ebass', 'acoustic_guitar', 'instrument',
        'di800', 'wireless_receiver', 'vocal_mic', 'choir_mic',
        'pulpit_mic', 'wireless_mic', 'drum'
    ].includes(node.type);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-2xl w-96 text-white max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-2">
                    <h2 className="text-lg font-bold">Configure {node.data.label}</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white text-xl">&times;</button>
                </div>

                <form onSubmit={handleSave} className="flex flex-col gap-5">

                    {needsChannelPatch && (
                        <div className="bg-zinc-800/50 p-3 rounded border border-blue-900/50">
                            <label className="block text-xs text-blue-400 mb-2 uppercase tracking-wider font-bold">Stagebox Channel (Patch)</label>
                            <input
                                type="number"
                                min="1"
                                max="128"
                                placeholder="e.g. 1"
                                value={config.patchChannel || ''}
                                onChange={(e) => setConfig({ ...config, patchChannel: parseInt(e.target.value, 10) })}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-sm focus:border-blue-500 outline-none"
                            />
                        </div>
                    )}

                    {node.type === 'drum' && (
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Breite (m)</label>
                                    <input type="number" step="0.5" min="1" value={config.widthMeters || 2} onChange={(e) => setConfig({ ...config, widthMeters: parseFloat(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Tiefe (m)</label>
                                    <input type="number" step="0.5" min="1" value={config.depthMeters || 2} onChange={(e) => setConfig({ ...config, depthMeters: parseFloat(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Anzahl der Toms</label>
                                <input type="number" min="0" max="4" value={config.tomCount ?? 2} onChange={(e) => setConfig({ ...config, tomCount: parseInt(e.target.value, 10) })} className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white" />
                            </div>
                        </div>
                    )}

                    {node.type === 'power' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-zinc-400 mb-2 uppercase tracking-wider">Verteiler-Typ</label>
                                <select
                                    value={config.powerType || 'STRIP'}
                                    onChange={(e) => setConfig({ ...config, powerType: e.target.value })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm focus:border-blue-500 outline-none"
                                >
                                    <option value="STRIP">Verteilersteckdose (Schuko)</option>
                                    <option value="DRUM">Kabeltrommel</option>
                                    <option value="DISTRO">Starkstromverteiler (CEE 16A/32A)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Anzahl der Steckdosen</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="24"
                                    value={config.socketCount ?? 6}
                                    onChange={(e) => setConfig({ ...config, socketCount: parseInt(e.target.value, 10) })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {(node.type === 'eguitar' || node.type === 'ebass') && (
                        <div className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded border border-zinc-700">
                            <input
                                type="checkbox"
                                checked={config.showAmp || false}
                                onChange={(e) => setConfig({ ...config, showAmp: e.target.checked })}
                                className="w-4 h-4 rounded accent-blue-500"
                            />
                            <label className="text-sm text-zinc-200">Verstärker (Amp) anzeigen</label>
                        </div>
                    )}

                    {node.type === 'instrument' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 uppercase">Instrumenten-Typ</label>
                                <select
                                    value={config.instType || 'violin'}
                                    onChange={(e) => setConfig({ ...config, instType: e.target.value })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white"
                                >
                                    <option value="violin">Violine / Bratsche</option>
                                    <option value="cello">Cello</option>
                                    <option value="trumpet">Trompete / Posaune</option>
                                    <option value="sax">Saxophon</option>
                                    <option value="flute">Flöte</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded border border-zinc-700">
                                <input
                                    type="checkbox"
                                    checked={config.useClipMic || false}
                                    onChange={(e) => setConfig({ ...config, useClipMic: e.target.checked })}
                                    className="w-4 h-4 rounded accent-blue-500"
                                />
                                <label className="text-sm text-zinc-200">Clip-Mikrofon (XLR Out) nutzen</label>
                            </div>
                        </div>
                    )}

                    {node.type === 'speaker' && (
                        <div>
                            <label className="block text-xs text-zinc-400 mb-2 uppercase tracking-wider">PA System Type</label>
                            <select
                                value={config.systemType || 'STACK'}
                                onChange={(e) => setConfig({ ...config, systemType: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white"
                            >
                                <option value="STACK">Ground Stack</option>
                                <option value="LINE_ARRAY">Line Array</option>
                            </select>
                        </div>
                    )}

                    {node.type === 'monitor' && (
                        <div>
                            <label className="block text-xs text-zinc-400 mb-2 uppercase tracking-wider">Monitor Modell</label>
                            <select
                                value={config.monitorType || 'MON_A12'}
                                onChange={(e) => setConfig({ ...config, monitorType: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white"
                            >
                                <option value="MON_A12">the box pro Mon A12</option>
                                <option value="MA120">the box MA120 MK II</option>
                            </select>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-zinc-700">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors text-sm">Apply Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NodeConfigModal;