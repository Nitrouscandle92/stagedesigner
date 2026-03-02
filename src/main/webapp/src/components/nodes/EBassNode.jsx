import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const EBassNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const showAmp = data.configuration?.showAmp || false;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center p-4 relative cursor-grab w-[160px] h-[220px]">
                {/* Amp Background (if active) */}
                {showAmp && (
                    <div className="absolute top-4 w-[120px] h-[90px] bg-zinc-900 border-4 border-zinc-800 rounded-sm shadow-2xl flex flex-col p-1 z-0">
                        <div className="w-full h-3 bg-zinc-800 flex items-center justify-around px-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        </div>
                        <div className="w-full flex-1 bg-zinc-950 opacity-80" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
                    </div>
                )}

                <div className="relative z-10 flex flex-col items-center -rotate-[15deg] mt-2 drop-shadow-2xl">
                    {/* Headstock & Tuning Pegs */}
                    <div className="w-3 h-7 bg-zinc-300 rounded-t-sm border border-zinc-400 -mb-1 flex flex-col gap-0.5 justify-center items-end pr-0.5 z-20">
                        {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-zinc-500 rounded-full" />)}
                    </div>
                    {/* Neck */}
                    <div className="w-2 h-24 bg-amber-900 border-x border-amber-950 z-10" />

                    {/* Bass Body (Fixed height issue) */}
                    <div className="w-[64px] h-[90px] bg-blue-800 border-2 border-blue-950 rounded-b-[40px] rounded-t-xl shadow-inner relative -mt-3 flex justify-center">
                        <div className="w-10 h-12 bg-white border border-gray-300 rounded-full mt-4 absolute -right-1" /> {/* Pickguard */}
                        <div className="w-6 h-1.5 bg-zinc-900 absolute bottom-4" /> {/* Bridge */}
                    </div>
                </div>

                <Handle type="source" position={Position.Bottom} id="inst-out" className="w-3 h-3 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#a855f7' }} />

                {/* Anti-rotating Label */}
                <div className="absolute -bottom-4 text-[10px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default EBassNode;