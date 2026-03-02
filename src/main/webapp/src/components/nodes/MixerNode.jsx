import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const MixerNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-32 h-32 bg-zinc-900 border-2 border-zinc-700 rounded-lg shadow-2xl flex flex-col p-1.5 cursor-grab relative">
                <div className="flex justify-between w-full h-1/4 mb-1">
                    <div className="w-1/2 h-full bg-blue-900/30 border border-blue-800/50 rounded-sm flex items-center justify-center">
                        <span className="text-[7px] text-blue-300 font-bold">{data.label || 'X32 Producer'}</span>
                    </div>
                </div>

                <div className="flex-grow flex justify-between px-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="w-0.5 h-full bg-black rounded-full relative">
                            <div className="absolute bottom-1 left-[-1.5px] w-1 h-2 bg-gray-300 rounded-sm shadow-md" />
                        </div>
                    ))}
                </div>

                <Handle type="target" position={Position.Left} id="aes50-in" className="w-2.5 h-2.5 border border-zinc-900 rounded-sm" style={{ top: '20%', backgroundColor: '#3b82f6' }} />

                {Array.from({ length: 16 }).map((_, i) => (
                    <Handle key={`local-in-${i}`} type="target" position={Position.Top} id={`local-in-${i+1}`} className="w-1.5 h-1.5 border border-zinc-900 rounded-sm" style={{ left: `${(i+1)*5.5}%`, backgroundColor: '#22c55e' }} />
                ))}

                {Array.from({ length: 8 }).map((_, i) => (
                    <Handle key={`local-out-${i}`} type="source" position={Position.Bottom} id={`local-out-${i+1}`} className="w-1.5 h-1.5 border border-zinc-900 rounded-sm" style={{ left: `${(i+1)*10}%`, backgroundColor: '#ef4444' }} />
                ))}

                {Array.from({ length: 6 }).map((_, i) => (
                    <React.Fragment key={`aux-${i}`}>
                        <Handle type="target" position={Position.Right} id={`aux-in-${i+1}`} className="w-1.5 h-1.5 border border-zinc-900 rounded-full" style={{ top: `${20 + (i*5)}%`, backgroundColor: '#22c55e' }} />
                        <Handle type="source" position={Position.Right} id={`aux-out-${i+1}`} className="w-1.5 h-1.5 border border-zinc-900 rounded-full" style={{ top: `${60 + (i*5)}%`, backgroundColor: '#ef4444' }} />
                    </React.Fragment>
                ))}
            </div>
        </RotatableNodeWrapper>
    );
};

export default MixerNode;