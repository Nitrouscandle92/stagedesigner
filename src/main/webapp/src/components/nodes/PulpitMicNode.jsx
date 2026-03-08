import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const PulpitMicNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const micNumber = data.configuration?.micNumber;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-2 relative cursor-grab w-[60px] h-[60px]">

                {/* Visual mic number indicator */}
                {micNumber && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[14px] font-bold px-1.5 py-0.5 rounded shadow-md z-20 pointer-events-none">
                        {micNumber}
                    </div>
                )}

                {/* Table Base & Gooseneck */}
                <div className="relative w-10 h-10 flex flex-col items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-md border-2 border-zinc-700 bg-zinc-900 shadow-xl" />
                    <div className="absolute bottom-4 w-1.5 h-10 bg-zinc-600 rounded-full shadow-lg rotate-12" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #333 1px, #333 2px)' }} />
                    <div className="absolute -top-4 right-1 w-2.5 h-4 bg-zinc-400 rounded-full rotate-45 border border-zinc-600" />
                </div>

                {/* XLR Out Port with Hitbox */}
                <div className="absolute bottom-0 w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center shadow-md">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="xlr-out" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                <div className="absolute -bottom-4 text-[14px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default PulpitMicNode;