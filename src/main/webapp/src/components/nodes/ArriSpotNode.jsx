import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const ArriSpotNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-24 h-24 flex items-center justify-center relative cursor-grab">
                {/* Barn Doors */}
                <div className="absolute -left-2 w-4 h-16 bg-zinc-800 border border-zinc-700 rounded-sm -rotate-12 shadow-md" />
                <div className="absolute -right-2 w-4 h-16 bg-zinc-800 border border-zinc-700 rounded-sm rotate-12 shadow-md" />

                {/* Fresnel Body */}
                <div className="w-16 h-18 bg-zinc-900 border-2 border-zinc-700 rounded-sm shadow-2xl flex items-center justify-center relative">
                    {/* Glass Lens */}
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center shadow-inner overflow-hidden">
                        <div className="w-full h-full bg-amber-400/10" style={{ backgroundImage: 'repeating-radial-gradient(circle, transparent, transparent 2px, rgba(255,255,255,0.05) 3px)' }} />
                    </div>
                    {/* Side Knobs */}
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-zinc-600 rounded-sm" />
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-zinc-600 rounded-sm" />
                </div>

                <Handle type="target" position={Position.Top} id="power-in" className="!bg-amber-600" />

                <div className="absolute -bottom-4 text-[14px] text-amber-500 font-bold bg-black/80 px-2 py-0.5 rounded whitespace-nowrap shadow-lg" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label || 'Arri Fresnel'}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default ArriSpotNode;