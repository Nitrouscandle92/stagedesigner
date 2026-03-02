import React from 'react';
import { Handle, Position } from '@xyflow/react';

const AcousticNode = ({ data }) => {
    const instrument = data.configuration?.instrument || 'Violin';
    const rotation = data.configuration?.rotation || 0;

    return (
        <div
            className="relative flex flex-col items-center justify-center w-8 h-12 cursor-grab group"
            style={{ transform: `rotate(${rotation}deg)` }}
        >            {/* Music Stand */}
            <div className="w-8 h-1 bg-zinc-500 mb-2 shadow-sm" />

            {/* Musician Chair (Top Down) */}
            <div className="w-10 h-10 bg-zinc-800 border border-zinc-600 rounded-full flex items-center justify-center shadow-md relative">
                <div className="w-8 h-4 bg-zinc-900 rounded-t-full absolute top-0" />
            </div>

            <div className="absolute -bottom-4 text-[9px] text-zinc-300 font-bold whitespace-nowrap bg-black/60 px-1 rounded">
                {data.label}: {instrument}
            </div>

            <div className="absolute -top-6 text-[8px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Double-click to config
            </div>

            {/* Mic/Pickup output */}
            <Handle type="source" position={Position.Right} className="w-2 h-2 bg-blue-500 border-none" />
        </div>
    );
};

export default AcousticNode;