import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const EPianoNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center cursor-grab relative">
                <div className="absolute top-4 w-[250px] h-[90px] flex justify-center items-center opacity-70">
                    <div className="w-full h-3 bg-zinc-600 rotate-6 absolute shadow-lg" />
                    <div className="w-full h-3 bg-zinc-600 -rotate-6 absolute shadow-lg" />
                </div>

                <div className="w-[350px] h-[110px] bg-zinc-900 border-y-4 border-zinc-800 rounded-md shadow-2xl flex flex-col justify-end p-2 relative z-10">
                    <div className="absolute top-2 left-4 right-4 h-4 flex gap-4 items-center opacity-80">
                        <div className="w-8 h-3 bg-zinc-700 rounded-full" />
                        <div className="w-16 h-6 bg-blue-900/60 border border-blue-500/30 rounded" />
                        <div className="flex-1" />
                        <div className="w-4 h-4 rounded-full bg-red-900/80" />
                    </div>

                    <div className="w-full h-10 bg-white flex gap-[1px] border-t-2 border-zinc-700 relative overflow-hidden mt-4">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className="flex-1 bg-white border-r border-gray-300 relative">
                                {![0, 3, 7, 10, 14, 17, 21].includes(i % 7) && (
                                    <div className="absolute top-0 -left-[60%] w-[120%] h-[60%] bg-black z-10" />
                                )}
                            </div>
                        ))}
                    </div>

                    <Handle type="source" position={Position.Left} id="inst-out-l" className="w-3.5 h-3.5 border-2 border-zinc-950 rounded-full" style={{ top: '60%', backgroundColor: '#a855f7' }} />
                    <Handle type="source" position={Position.Left} id="power-main-in" className="w-3 h-3 border-2 border-zinc-900 rounded-full" style={{ top: '80%', backgroundColor: '#eab308' }} />
                </div>

                {/* Anti-rotating Label */}
                <div className="absolute -bottom-6 text-[10px] font-bold text-zinc-300 bg-black/80 px-2 py-1 rounded whitespace-nowrap" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default EPianoNode;