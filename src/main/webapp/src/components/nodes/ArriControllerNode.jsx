import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const ArriControllerNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-40 h-16 bg-zinc-900 border-2 border-zinc-600 rounded shadow-2xl flex flex-col p-2 cursor-grab relative">
                {/* Status LEDs */}
                <div className="flex gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                </div>

                {/* Dimmer Channels (Simulated Outlets) */}
                <div className="flex justify-between mt-auto">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-zinc-800 border border-zinc-700 rounded-sm relative flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full border border-zinc-600 mt-1" />
                            <Handle type="source" position={Position.Bottom} id={`out-${i+1}`} className="!w-2 !h-2 !bg-amber-600 !-bottom-1" />
                        </div>
                    ))}
                </div>

                <Handle type="target" position={Position.Left} id="dmx-in" className="!bg-purple-500" />
                <Handle type="target" position={Position.Top} id="power-in" className="!bg-amber-500" />

                <div className="absolute -top-4 right-0 text-[14px] text-zinc-500 font-mono uppercase">Arri Dimmer Pack</div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default ArriControllerNode;