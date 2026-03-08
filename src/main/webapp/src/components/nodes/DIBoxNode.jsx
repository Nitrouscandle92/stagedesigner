import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const DI800Node = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[120px] h-[35px] bg-zinc-800 border-2 border-zinc-600 rounded-sm flex flex-col justify-center p-1 relative shadow-lg cursor-grab">

                <div className="flex justify-between items-center mb-1">
                    <div
                        className="text-[14px] text-zinc-400 font-bold uppercase tracking-widest bg-black/50 px-1 rounded whitespace-nowrap"
                        style={{ transform: `rotate(${-rotation}deg)` }}
                    >
                        {data.label || 'ULTRA-DI PRO DI800'}
                    </div>
                </div>

                {/* 8 Channel Indicators */}
                <div className="flex justify-between px-1 mt-1">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-zinc-900 rounded-full border border-zinc-700" />
                    ))}
                </div>

                {/* Power IN (Left) */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Left} id="power-in" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                {/* Inputs (Inst - Purple) on Top */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`in-wrapper-${i}`}
                        className="absolute -top-1.5 w-2 h-2 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20"
                        style={{ left: `${10 + i * 11}%` }}
                    >
                        <div className="w-1 h-1 bg-purple-500 rounded-full z-10" />
                        <Handle
                            type="target"
                            position={Position.Top}
                            id={`inst-in-${i+1}`}
                            className="!w-full !h-full !opacity-0 z-30 cursor-crosshair"
                        />
                    </div>
                ))}

                {/* Outputs (XLR - Blue) on Bottom */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`out-wrapper-${i}`}
                        className="absolute -bottom-1.5 w-2 h-2 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20"
                        style={{ left: `${10 + i * 11}%` }}
                    >
                        <div className="w-1 h-1 bg-blue-500 rounded-full z-10" />
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id={`xlr-out-${i+1}`}
                            className="!w-full !h-full !opacity-0 z-30 cursor-crosshair"
                        />
                    </div>
                ))}

            </div>
        </RotatableNodeWrapper>
    );
};

export default DI800Node;