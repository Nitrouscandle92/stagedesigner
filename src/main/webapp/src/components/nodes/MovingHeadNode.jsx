import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const MovingHeadNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-20 h-24 flex flex-col items-center justify-center relative cursor-grab">
                {/* Base Unit */}
                <div className="w-16 h-10 bg-zinc-900 border-2 border-zinc-700 rounded-sm shadow-2xl relative">
                    <div className="absolute top-1 left-2 right-2 h-1 bg-blue-500/20 rounded-full" /> {/* Display */}
                </div>

                {/* Head unit with Lens */}
                <div className="w-12 h-14 bg-zinc-800 border-2 border-zinc-600 rounded-2xl shadow-xl mt-[-4px] flex flex-col items-center justify-start p-1 relative">
                    <div className="w-8 h-8 rounded-full bg-zinc-950 border-4 border-zinc-700 shadow-inner flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400/30 blur-[1px]" />
                    </div>
                    {/* Cooling Vents */}
                    <div className="mt-1 w-6 h-3 flex flex-col gap-0.5">
                        <div className="w-full h-[1px] bg-zinc-700" />
                        <div className="w-full h-[1px] bg-zinc-700" />
                    </div>
                </div>

                <Handle type="target" position={Position.Left} id="dmx-in" className="!bg-purple-500" style={{ top: '25%' }} />
                <Handle type="source" position={Position.Right} id="dmx-out" className="!bg-purple-500" style={{ top: '25%' }} />
                <Handle type="target" position={Position.Left} id="power-in" className="!bg-amber-500" style={{ top: '75%' }} />

                <div className="absolute -bottom-4 text-[14px] text-purple-300 font-bold bg-black/80 px-2 py-0.5 rounded whitespace-nowrap shadow-lg" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label || 'Moving Head'}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default MovingHeadNode;