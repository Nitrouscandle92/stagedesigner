import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const SpeakerSystemNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const systemType = data.configuration?.systemType || 'STACK';

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="relative flex flex-col items-center justify-center cursor-grab group">
                {systemType === 'LINE_ARRAY' ? (
                    // Flown Line Array Module
                    <div className="w-24 h-48 bg-zinc-950 border-4 border-zinc-800 rounded-sm flex flex-col items-center justify-evenly shadow-2xl p-2 relative">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-20 h-8 bg-zinc-900 border-2 border-zinc-700 rounded-sm flex items-center justify-center relative">
                                <div className="w-14 h-4 bg-black rounded-full opacity-70 border border-zinc-800" />
                                <div className="w-3 h-3 bg-zinc-800 rounded-full absolute right-1" />
                            </div>
                        ))}
                        <Handle type="target" position={Position.Right} id="spk-in-array" className="w-4 h-4 border-2 border-zinc-950 rounded-full" style={{ top: '40%', backgroundColor: '#f97316' }} />
                        <Handle type="source" position={Position.Right} id="spk-link-array" className="w-4 h-4 border-2 border-zinc-950 rounded-full" style={{ top: '60%', backgroundColor: '#f97316' }} />
                    </div>
                ) : (
                    // Ground Stack: JBL JRX 225 (Dual 15") + JRX 218S (Single 18")
                    <div className="flex flex-col items-center gap-1">

                        {/* Top: JBL JRX 225 (Dual 15" Two-Way) */}
                        <div className="w-28 h-48 bg-zinc-950 border-2 border-zinc-700 rounded-sm flex flex-col items-center justify-between p-2 shadow-lg relative">
                            {/* HF Horn */}
                            <div className="w-16 h-6 bg-black rounded-sm border border-zinc-800 shadow-inner mb-1" />
                            {/* Upper 15" Driver */}
                            <div className="w-20 h-20 bg-black rounded-full border-2 border-zinc-800 flex items-center justify-center shadow-inner relative">
                                <div className="w-6 h-6 bg-zinc-900 rounded-full border border-zinc-800" />
                            </div>
                            {/* Lower 15" Driver */}
                            <div className="w-20 h-20 bg-black rounded-full border-2 border-zinc-800 flex items-center justify-center shadow-inner relative">
                                <div className="w-6 h-6 bg-zinc-900 rounded-full border border-zinc-800" />
                            </div>

                            {/* SPK IN & LINK for Top */}
                            <Handle type="target" position={Position.Left} id="spk-in-top" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ top: '40%', backgroundColor: '#f97316' }} />
                            <Handle type="source" position={Position.Left} id="spk-link-top" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ top: '60%', backgroundColor: '#f97316' }} />
                        </div>

                        {/* Sub: JBL JRX 218S (Single 18") */}
                        <div className="w-36 h-32 bg-zinc-950 border-2 border-zinc-800 rounded-sm flex items-center justify-center shadow-2xl relative">
                            {/* 18" Driver */}
                            <div className="w-28 h-28 bg-black rounded-full border-4 border-zinc-900 flex items-center justify-center shadow-inner relative">
                                <div className="w-10 h-10 bg-zinc-900 rounded-full border border-zinc-800" />
                            </div>

                            {/* SPK IN & LINK for Sub */}
                            <Handle type="target" position={Position.Right} id="spk-in-sub" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ top: '40%', backgroundColor: '#f97316' }} />
                            <Handle type="source" position={Position.Right} id="spk-link-sub" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ top: '60%', backgroundColor: '#f97316' }} />
                        </div>
                    </div>
                )}

                <div className="absolute -bottom-6 text-[10px] text-zinc-300 font-bold whitespace-nowrap bg-black/50 px-1.5 py-0.5 rounded shadow">
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default SpeakerSystemNode;