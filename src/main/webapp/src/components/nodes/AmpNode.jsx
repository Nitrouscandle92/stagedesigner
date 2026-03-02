import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const AmpNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[120px] h-[35px] bg-zinc-800 border-2 border-zinc-600 rounded-sm shadow-xl flex items-center justify-between p-1 cursor-grab relative">

                {/* Power Switch */}
                <div className="w-3 h-5 bg-black rounded-sm flex items-center justify-center border border-zinc-900 shadow-inner">
                    <div className="w-1.5 h-2 bg-red-600 rounded-sm" />
                </div>

                {/* EP4000 Center Grill */}
                <div className="flex-1 h-full mx-2 flex flex-col justify-evenly opacity-60">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-full h-px bg-black" />
                    ))}
                </div>

                {/* Gain Knobs & LEDs */}
                <div className="flex items-center gap-2 mr-1">
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        <div className="w-3 h-3 bg-zinc-900 rounded-full border border-zinc-700 shadow-md" />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        <div className="w-3 h-3 bg-zinc-900 rounded-full border border-zinc-700 shadow-md" />
                    </div>
                </div>

                {/* Power IN (Left) */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Left} id="power-in" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                {/* XLR IN A & B (Top) */}
                <div className="absolute -top-1.5 left-[30%] w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Top} id="xlr-in-a" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>
                <div className="absolute -top-1.5 left-[40%] w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Top} id="xlr-in-b" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                {/* SPK OUT A & B (Bottom) */}
                <div className="absolute -bottom-1.5 left-[70%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="spk-out-a" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>
                <div className="absolute -bottom-1.5 left-[80%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="spk-out-b" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

            </div>
        </RotatableNodeWrapper>
    );
};

export default AmpNode;