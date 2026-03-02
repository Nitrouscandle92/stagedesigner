import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const WirelessMicNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-2 relative cursor-grab w-[50px] h-[90px]">
                {/* Wireless Mic laying flat */}
                <div className="relative w-8 h-16 flex flex-col items-center drop-shadow-2xl rotate-12">
                    <div className="w-6 h-7 bg-zinc-300 rounded-t-full border-[3px] border-zinc-400 opacity-90 z-10" style={{ backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
                    <div className="w-4 h-12 bg-zinc-800 border-x border-zinc-950 -mt-1 rounded-b-sm flex flex-col items-center justify-end pb-1">
                        <div className="w-full h-1.5 bg-zinc-600 mb-1" /> {/* Display screen indicator */}
                        <div className="w-2.5 h-1.5 bg-red-600 rounded-b-sm" /> {/* Colored bottom cap often found on wireless mics */}
                    </div>
                </div>

                <Handle type="source" position={Position.Bottom} id="rf-out" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#d946ef' }} />

                <div className="absolute -bottom-2 text-[9px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default WirelessMicNode;