import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const StageboxNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[220px] h-[80px] bg-[#18181b] border-2 border-zinc-600 rounded-sm shadow-2xl flex flex-col p-2 relative cursor-grab">

                <div className="flex justify-between items-start mb-1">
                    <div
                        className="text-[9px] text-zinc-300 font-bold uppercase tracking-widest bg-black/50 px-1 rounded whitespace-nowrap"
                        style={{ transform: `rotate(${-rotation}deg)` }}
                    >
                        {data.label || 'S16 Digital Snake'}
                    </div>
                    <div className="w-6 h-3 bg-black border border-zinc-800 flex items-center justify-center rounded-sm">
                        <span className="text-[7px] text-red-500 font-mono">1-8</span>
                    </div>
                </div>

                {/* Power IN */}
                <Handle type="target" position={Position.Left} id="power-in" className="w-2.5 h-2.5 border border-zinc-900 rounded-full" style={{ top: '50%', backgroundColor: '#eab308' }} />


                {/* AES50 OUT */}
                <Handle
                    type="source"
                    position={Position.Right}
                    id="aes50-out"
                    className="w-2.5 h-2.5 border-2 border-zinc-950 rounded-sm z-20 cursor-crosshair"
                    style={{ top: '50%', right: '-4px', backgroundColor: '#3b82f6' }}
                />

                <div className="flex h-full mt-1 gap-2">
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                        {/* IN 1-8 (Targets) - Cable must come FROM microphone TO here */}
                        <div className="flex justify-between pr-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={`in-${i}`} className="relative w-3 h-3 bg-zinc-400 rounded-full border border-zinc-600 flex items-center justify-center shadow-inner">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                                    {/* Hitbox enlarged */}
                                    <Handle
                                        type="target"
                                        position={Position.Top}
                                        id={`xlr-in-${i + 1}`}
                                        className="!w-full !h-full !opacity-0 z-30 cursor-crosshair"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* IN 9-16 (Targets) */}
                        <div className="flex justify-between pr-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={`in-${i + 8}`} className="relative w-3 h-3 bg-zinc-400 rounded-full border border-zinc-600 flex items-center justify-center shadow-inner">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                                    <Handle
                                        type="target"
                                        position={Position.Bottom}
                                        id={`xlr-in-${i + 9}`}
                                        className="!w-full !h-full !opacity-0 z-30 cursor-crosshair"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* OUT 1-8 (Sources) - Cable is pulled FROM here TO the monitor */}
                    <div className="w-[35%] border-l-2 border-zinc-700 pl-2 flex flex-col justify-end pb-0.5">
                        <div className="flex justify-between">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={`out-${i}`} className="relative w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center shadow-md">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full z-10" />
                                    <Handle
                                        type="source"
                                        position={Position.Bottom}
                                        id={`xlr-out-${i + 1}`}
                                        className="!w-full !h-full !opacity-0 z-30 cursor-crosshair"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </RotatableNodeWrapper>
    );
};

export default StageboxNode;