import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const VocalMicNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const micNumber = data.configuration?.micNumber;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-2 relative cursor-grab w-[80px] h-[80px]">

                {/* Visual mic number indicator */}
                {micNumber && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[14px] font-bold px-1.5 py-0.5 rounded shadow-md z-20 pointer-events-none">
                        {micNumber}
                    </div>
                )}

                {/* Mic Stand Top-Down */}
                <div className="relative w-12 h-12 flex flex-col items-center justify-center">
                    <div className="absolute w-12 h-12 rounded-full border-4 border-zinc-800 bg-zinc-900/40 shadow-xl" />
                    <div className="absolute w-2 h-12 bg-zinc-600 rounded-full shadow-lg -rotate-45" />

                    {/* Mic Clip & Head */}
                    <div className="absolute -top-3 -right-3 flex flex-col items-center rotate-45 drop-shadow-lg">
                        <div className="w-5 h-7 bg-zinc-400 rounded-t-full border-[3px] border-zinc-500 opacity-90" style={{ backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
                        <div className="w-3 h-5 bg-zinc-800 border border-zinc-950" />
                    </div>
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
export default VocalMicNode;