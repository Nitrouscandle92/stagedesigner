import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const RgbSpotNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-20 h-20 flex items-center justify-center relative cursor-grab">
                {/* PAR Can Body */}
                <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* LED Grid Texture */}
                    <div className="w-12 h-12 rounded-full border border-zinc-800 flex flex-wrap gap-0.5 p-1 justify-center items-center opacity-60">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-red-500/40' : i % 3 === 1 ? 'bg-green-500/40' : 'bg-blue-500/40'}`} />
                        ))}
                    </div>
                </div>

                {/* Mounting Bracket */}
                <div className="absolute top-0 w-18 h-18 border-2 border-zinc-800/50 rounded-full -z-10" />

                <Handle type="target" position={Position.Left} id="dmx-in" className="!bg-purple-500" />
                <Handle type="source" position={Position.Right} id="dmx-out" className="!bg-purple-500" />

                <div className="absolute -bottom-4 text-[9px] text-zinc-300 font-bold bg-black/80 px-2 py-0.5 rounded whitespace-nowrap shadow-lg" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label || 'RGB LED PAR'}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default RgbSpotNode;