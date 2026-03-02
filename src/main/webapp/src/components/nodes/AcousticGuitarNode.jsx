import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const AcousticGuitarNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-4 relative cursor-grab w-[140px] h-[200px]">
                {/* Acoustic Guitar: Figure-8 Body */}
                <div className="relative z-10 flex flex-col items-center -rotate-12 drop-shadow-2xl">
                    <div className="w-3 h-6 bg-amber-900 rounded-t-sm border border-amber-950 -mb-1 z-20" />
                    <div className="w-2.5 h-16 bg-amber-800 border-x border-amber-900 z-10" />

                    {/* Body */}
                    <div className="w-16 h-24 bg-amber-600 border-2 border-amber-800 rounded-full flex flex-col items-center -mt-3 shadow-inner relative z-0">
                        <div className="absolute top-8 w-6 h-6 bg-amber-950 rounded-full border-[3px] border-amber-200" /> {/* Soundhole */}
                        <div className="absolute bottom-6 w-8 h-1.5 bg-amber-950 rounded-sm" /> {/* Bridge */}
                    </div>
                </div>
                <Handle type="source" position={Position.Bottom} id="inst-out" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#a855f7' }} />
                <div className="absolute -bottom-4 text-[10px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>{data.label}</div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default AcousticGuitarNode;