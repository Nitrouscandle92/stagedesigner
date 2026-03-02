import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const PowerNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const type = data.configuration?.powerType || 'STRIP';
    const socketCount = data.configuration?.socketCount || 6;

    const renderVisual = () => {
        switch(type) {
            case 'DRUM':
                return (
                    <div className="w-[75px] h-[75px] rounded-full bg-red-600 border-[3px] border-zinc-800 flex items-center justify-center shadow-lg relative">
                        <div className="absolute -left-1 w-2 h-3 bg-zinc-900 rounded-sm" />
                        <Handle type="target" position={Position.Left} id="power-main-in" className="w-2 h-2 border border-zinc-900 rounded-full z-20 cursor-crosshair" style={{ left: '-4px', backgroundColor: '#eab308' }} />

                        <div className="w-[45px] h-[45px] rounded-full bg-zinc-900 border-2 border-red-800 grid grid-cols-2 grid-rows-2 gap-[2px] p-[3px]">
                            {Array.from({ length: Math.min(socketCount, 4) }).map((_, i) => (
                                <div key={`power-out-${i}`} className="relative w-full h-full bg-zinc-950 rounded-full flex items-center justify-center border border-zinc-700 shadow-inner">
                                    <div className="w-1 h-1 bg-yellow-500 rounded-full z-10" />
                                    {/* Hitbox completely fills the socket */}
                                    <Handle type="source" position={Position.Bottom} id={`power-out-${i+1}`} className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'DISTRO':
                return (
                    <div className="w-[75px] min-h-[100px] bg-red-700 border-2 border-zinc-800 rounded-sm shadow-2xl flex flex-col p-1 gap-1 relative">
                        <div className="text-[7px] font-bold text-white mb-0.5 uppercase text-center border-b border-red-900 pb-0.5">Distro</div>
                        <Handle type="target" position={Position.Left} id="power-main-in" className="w-2.5 h-2.5 border-[2px] border-zinc-900 rounded-full z-20 cursor-crosshair" style={{ top: '15px', left: '-5px', backgroundColor: '#eab308' }} />

                        <div className="grid grid-cols-2 gap-1 mt-1">
                            {Array.from({ length: socketCount }).map((_, i) => (
                                <div key={`power-out-${i}`} className="relative w-[22px] h-[22px] bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 shadow-inner mx-auto">
                                    <div className="absolute flex gap-[2px]">
                                        <div className="w-[1.5px] h-[1.5px] bg-zinc-700 rounded-full" />
                                        <div className="w-[1.5px] h-[1.5px] bg-zinc-700 rounded-full" />
                                    </div>
                                    <div className="w-1 h-1 bg-yellow-500 rounded-full z-10" />
                                    <Handle type="source" position={Position.Bottom} id={`power-out-${i+1}`} className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'STRIP':
            default:
                return (
                    <div className="min-w-[80px] h-[18px] bg-zinc-900 border border-zinc-600 rounded-sm shadow-md flex items-center px-1 relative">
                        <div className="absolute -left-1 w-1.5 h-2.5 bg-zinc-800 border border-zinc-600 rounded-sm" />
                        <Handle type="target" position={Position.Left} id="power-main-in" className="w-2 h-2 border border-zinc-900 rounded-full z-20 cursor-crosshair" style={{ left: '-3px', backgroundColor: '#eab308' }} />

                        <div className="flex gap-1 items-center w-full pl-1">
                            {Array.from({ length: socketCount }).map((_, i) => (
                                <div key={`power-out-${i}`} className="relative w-[12px] h-[12px] bg-zinc-950 rounded-full border border-zinc-700 flex items-center justify-center shadow-inner">
                                    <div className="absolute flex gap-[1.5px] rotate-45">
                                        <div className="w-[1.5px] h-[1.5px] bg-zinc-800 rounded-full" />
                                        <div className="w-[1.5px] h-[1.5px] bg-zinc-800 rounded-full" />
                                    </div>
                                    <div className="w-[3px] h-[3px] bg-yellow-500 rounded-full z-10" />
                                    <Handle type="source" position={Position.Bottom} id={`power-out-${i+1}`} className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="relative flex flex-col items-center justify-center cursor-grab p-1">
                {renderVisual()}
                <div
                    className="absolute -bottom-4 text-[8px] text-yellow-500 font-bold whitespace-nowrap bg-black/80 px-1.5 py-0.5 rounded z-50"
                    style={{ transform: `rotate(${-rotation}deg)` }}
                >
                    {data.label} ({socketCount}x)
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default PowerNode;