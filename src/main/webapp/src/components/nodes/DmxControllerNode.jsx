import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const DmxControllerNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-32 h-24 bg-zinc-900 border-2 border-zinc-700 rounded-lg shadow-2xl flex flex-col p-2 cursor-grab relative">
                {/* Touchscreen Area */}
                <div className="w-full h-1/2 bg-zinc-950 border border-zinc-800 rounded-sm mb-2 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-blue-500/10 flex flex-col p-1">
                        <div className="w-full h-1 bg-blue-500/30 rounded-full" />
                        <div className="mt-1 flex gap-1">
                            <div className="w-4 h-4 bg-zinc-800 rounded-sm" />
                            <div className="w-4 h-4 bg-zinc-800 rounded-sm" />
                        </div>
                    </div>
                </div>

                {/* Encoders & Buttons */}
                <div className="flex-grow flex justify-between items-end pb-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-inner">
                            <div className="w-1 h-2 bg-zinc-600 rounded-full" />
                        </div>
                    ))}
                </div>

                <Handle type="source" position={Position.Right} id="dmx-out" className="!bg-purple-500" />
                <Handle type="target" position={Position.Left} id="power-in" className="!bg-amber-500" />
            </div>
        </RotatableNodeWrapper>
    );
};

export default DmxControllerNode;