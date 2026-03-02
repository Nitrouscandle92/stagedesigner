import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const CrossoverNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[120px] h-[35px] bg-zinc-800 border-2 border-zinc-600 rounded-sm flex items-center justify-between p-1 relative shadow-lg cursor-grab">

                {/* Visuals: Knobs and LED */}
                <div className="flex flex-col h-full justify-between w-full opacity-80 px-1">
                    <div className="flex justify-between items-start">
                        <div
                            className="text-[6px] text-zinc-300 font-bold uppercase tracking-widest bg-black/50 px-1 rounded"
                            style={{ transform: `rotate(${-rotation}deg)` }}
                        >
                            {data.label || 'Crossover 2-Way'}
                        </div>
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_#ef4444] mt-0.5" />
                    </div>
                    <div className="flex justify-around items-end pb-0.5">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center shadow-md">
                                <div className="w-0.5 h-1.5 bg-white rotate-45 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Power IN (Left) */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Left} id="power-in" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                {/* Inputs (XLR - Green) on Top: Main L & Main R */}
                <div className="absolute -top-1.5 left-[30%] w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20" title="Main In L">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Top} id="xlr-in-l" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>
                <div className="absolute -top-1.5 left-[70%] w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20" title="Main In R">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Top} id="xlr-in-r" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                {/* Outputs (XLR - Red) on Bottom: High L, Low L, High R, Low R */}
                <div className="absolute -bottom-1.5 left-[20%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20" title="High Out L">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="xlr-out-high-l" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>
                <div className="absolute -bottom-1.5 left-[40%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20" title="Low Out L">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="xlr-out-low-l" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>
                <div className="absolute -bottom-1.5 left-[60%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20" title="High Out R">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="xlr-out-high-r" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>
                <div className="absolute -bottom-1.5 left-[80%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20" title="Low Out R">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full z-10" />
                    <Handle type="source" position={Position.Bottom} id="xlr-out-low-r" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

            </div>
        </RotatableNodeWrapper>
    );
};

export default CrossoverNode;