import React from 'react';
import { Handle, Position, useEdges } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const WirelessReceiverNode = ({ id, data, selected }) => {
    const edges = useEdges();
    const rotation = data.configuration?.rotation || 0;

    const connectedMics = edges.filter(e => e.target === id && e.targetHandle?.startsWith('rf-in')).length;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[70px] h-[35px] bg-zinc-900 border-2 border-zinc-700 rounded-sm flex items-center px-1 gap-1 shadow-inner cursor-grab relative">

                <div className="flex flex-1 gap-1">
                    {[1, 2].map(ch => (
                        <div key={ch} className={`flex-1 h-4 border border-zinc-800 rounded-sm text-[6px] flex items-center justify-center ${ch <= connectedMics ? 'bg-cyan-900 text-cyan-400' : 'bg-black text-zinc-700'}`}>
                            CH{ch}
                        </div>
                    ))}
                </div>

                <div className="absolute -top-1.5 left-[25%] w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Top} id="rf-in-1" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                <div className="absolute -top-1.5 left-[75%] w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Top} id="rf-in-2" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

                {connectedMics > 0 && (
                    <div className="absolute -bottom-1.5 left-[25%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full z-10" />
                        <Handle type="source" position={Position.Bottom} id="xlr-out-1" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                    </div>
                )}

                {connectedMics > 1 && (
                    <div className="absolute -bottom-1.5 left-[75%] w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full z-10" />
                        <Handle type="source" position={Position.Bottom} id="xlr-out-2" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                    </div>
                )}

                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full z-10" />
                    <Handle type="target" position={Position.Left} id="power-in" className="!w-full !h-full !opacity-0 z-30 cursor-crosshair" />
                </div>

            </div>
        </RotatableNodeWrapper>
    );
};

export default WirelessReceiverNode;