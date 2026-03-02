import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const ChoirMicNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-2 relative cursor-grab w-[80px] h-[80px]">
                {/* Stand Base */}
                <div className="relative w-12 h-12 flex flex-col items-center justify-center">
                    <div className="absolute w-12 h-12 rounded-full border-[3px] border-zinc-800 bg-zinc-900/50 shadow-2xl" />
                    <div className="absolute w-1.5 h-14 bg-zinc-500 rounded-full shadow-lg -rotate-[30deg]" /> {/* Boom arm */}

                    {/* Pencil Condenser Mic Head */}
                    <div className="absolute -top-4 -right-2 flex flex-col items-center rotate-[60deg] drop-shadow-lg">
                        <div className="w-2 h-8 bg-zinc-300 rounded-t-sm border border-zinc-500" />
                    </div>
                </div>

                <Handle type="source" position={Position.Bottom} id="xlr-out" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#3b82f6' }} />

                {/* Anti-rotating label */}
                <div className="absolute -bottom-4 text-[9px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default ChoirMicNode;