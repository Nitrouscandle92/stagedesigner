import React from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';
import {Handle, Position} from "@xyflow/react";

const UprightPianoNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[375px] h-[150px] bg-[#3e2723] border-[4px] border-[#26140e] rounded-sm shadow-2xl flex flex-col justify-between p-1.5 relative cursor-grab">
                {/* Top wood cover */}
                <div className="w-full h-[60%] border-b-4 border-[#26140e] shadow-inner opacity-90" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }} />

                <Handle type="source" position={Position.Left} id="inst-out-l" className="w-3.5 h-3.5 border-2 border-zinc-950 rounded-full" style={{ top: '20%', backgroundColor: '#a855f7' }} />
                <Handle type="source" position={Position.Left} id="power-main-in" className="w-3 h-3 border-2 border-zinc-900 rounded-full" style={{ top: '40%', backgroundColor: '#eab308' }} />

                {/* Keyboard section */}
                <div className="w-full h-[35%] bg-zinc-900 border-2 border-[#1a0e0a] rounded-sm flex p-1 shadow-inner relative z-10">
                    <div className="w-full h-full bg-white flex gap-[1px]">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className="flex-1 bg-white border-r border-gray-300 relative">
                                {![0, 3, 7, 10, 14, 17, 21].includes(i % 7) && (
                                    <div className="absolute top-0 -left-[60%] w-[120%] h-2/3 bg-black z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Anti-rotating Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-bold text-zinc-300 uppercase tracking-widest bg-black/80 px-3 py-1 rounded z-50 whitespace-nowrap" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default UprightPianoNode;