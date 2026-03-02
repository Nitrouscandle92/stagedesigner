import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const MonitorNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const type = data.configuration?.monitorType || 'MON_A12';

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            {/* Added p-1 to give the ports some breathing room from the exact clipping edge */}
            <div className="flex flex-col items-center cursor-grab group relative p-1">

                {type === 'MA120' ? (
                    /* the box MA120 MK II (approx. 40x40cm -> 100x100px) */
                    <div
                        className="w-[100px] h-[100px] bg-zinc-900 border-2 border-zinc-700 rounded-md shadow-xl flex flex-col justify-end p-1 relative z-10"
                        style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}
                    >
                        <div className="w-full h-3/4 bg-zinc-950 rounded-sm border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                            <div className="w-14 h-14 bg-black rounded-full opacity-60 shadow-inner" />
                        </div>
                        <div className="w-full h-1/4 flex items-center justify-around px-2 opacity-50">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        </div>
                    </div>
                ) : (
                    /* the box pro Mon A12 (approx. 50x45cm -> 125x115px) */
                    <div
                        className="w-[125px] h-[115px] bg-zinc-950 border-2 border-zinc-800 shadow-2xl flex items-center justify-center relative z-10"
                        style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0 100%)', borderRadius: '4px' }}
                    >
                        <div className="w-[110px] h-[95px] bg-zinc-900 rounded-sm border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                            <div className="w-16 h-16 bg-black rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-inner relative z-10">
                                <div className="w-5 h-5 bg-zinc-900 rounded-full border border-zinc-800" />
                            </div>
                        </div>
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-black rounded-full opacity-50" />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-black rounded-full opacity-50" />
                    </div>
                )}

                {/* Anti-rotating label */}
                <div
                    className="absolute -bottom-4 text-[9px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50"
                    style={{ transform: `rotate(${-rotation}deg)` }}
                >
                    {data.label}
                </div>

                {/* --- VISUAL PORTS & INVISIBLE HANDLES --- */}

                {/* Audio IN (Green) - Left Side */}
                <div className="absolute left-0 top-[30%] w-2 h-2 bg-zinc-800 border border-zinc-600 rounded-sm flex items-center justify-center z-20">
                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                    <Handle type="target" position={Position.Left} id="xlr-in" className="w-1 h-1 opacity-0" />
                </div>

                {/* Audio OUT/LINK (Red) - Left Side */}
                <div className="absolute left-0 top-[70%] w-2 h-2 bg-zinc-800 border border-zinc-600 rounded-sm flex items-center justify-center z-20">
                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                    <Handle type="source" position={Position.Left} id="xlr-out" className="w-1 h-1 opacity-0" />
                </div>

                {/* Power IN (Yellow) - Right Side */}
                <div className="absolute right-0 top-[50%] -translate-y-1/2 w-2 h-2 bg-zinc-800 border border-zinc-600 rounded-sm flex items-center justify-center z-20">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                    <Handle type="target" position={Position.Right} id="power-in" className="w-1 h-1 opacity-0" />
                </div>

            </div>
        </RotatableNodeWrapper>
    );
};

export default MonitorNode;