import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const VocalMicNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-2 relative cursor-grab w-[80px] h-[80px]">
                {/* Mic Stand Top-Down */}
                <div className="relative w-12 h-12 flex flex-col items-center justify-center">
                    <div className="absolute w-12 h-12 rounded-full border-4 border-zinc-800 bg-zinc-900/40 shadow-xl" /> {/* Base */}
                    <div className="absolute w-2 h-12 bg-zinc-600 rounded-full shadow-lg -rotate-45" /> {/* Boom arm */}

                    {/* Mic Clip & Head */}
                    <div className="absolute -top-3 -right-3 flex flex-col items-center rotate-45 drop-shadow-lg">
                        <div className="w-5 h-7 bg-zinc-400 rounded-t-full border-[3px] border-zinc-500 opacity-90" style={{ backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', backgroundSize: '3px 3px' }} /> {/* Grille */}
                        <div className="w-3 h-5 bg-zinc-800 border border-zinc-950" /> {/* Body */}
                    </div>
                </div>

                <Handle type="source" position={Position.Bottom} id="xlr-out" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#3b82f6' }} />

                <div className="absolute -bottom-4 text-[9px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default VocalMicNode;