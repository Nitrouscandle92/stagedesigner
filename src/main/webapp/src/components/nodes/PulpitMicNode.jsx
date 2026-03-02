import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const PulpitMicNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-2 relative cursor-grab w-[60px] h-[60px]">
                {/* Table Base & Gooseneck */}
                <div className="relative w-10 h-10 flex flex-col items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-md border-2 border-zinc-700 bg-zinc-900 shadow-xl" /> {/* Heavy base */}
                    <div className="absolute bottom-4 w-1.5 h-10 bg-zinc-600 rounded-full shadow-lg rotate-12" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #333 1px, #333 2px)' }} /> {/* Gooseneck texture */}
                    <div className="absolute -top-4 right-1 w-2.5 h-4 bg-zinc-400 rounded-full rotate-45 border border-zinc-600" /> {/* Tiny head */}
                </div>

                <Handle type="source" position={Position.Bottom} id="xlr-out" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#3b82f6' }} />

                <div className="absolute -bottom-4 text-[9px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default PulpitMicNode;