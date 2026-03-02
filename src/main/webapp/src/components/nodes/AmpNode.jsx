import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const AmpNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            {/* 19" width = 120px at 250px/m scale */}
            <div className="w-[120px] h-[35px] bg-zinc-800 border-2 border-zinc-600 rounded-sm shadow-xl flex items-center justify-between p-1 cursor-grab relative">

                {/* Power Switch (Left) */}
                <div className="w-3 h-5 bg-black rounded-sm flex items-center justify-center border border-zinc-900 shadow-inner">
                    <div className="w-1.5 h-2 bg-red-600 rounded-sm" />
                </div>

                {/* EP4000 Center Grill */}
                <div className="flex-1 h-full mx-2 flex flex-col justify-evenly opacity-60">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-full h-px bg-black" />
                    ))}
                </div>

                {/* Gain Knobs & LEDs (Right) */}
                <div className="flex items-center gap-2 mr-1">
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="w-1 h-1 bg-red-500 rounded-full" /> {/* Clip */}
                        <div className="w-1 h-1 bg-green-500 rounded-full" /> {/* Signal */}
                        <div className="w-3 h-3 bg-zinc-900 rounded-full border border-zinc-700 shadow-md" /> {/* Knob */}
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        <div className="w-3 h-3 bg-zinc-900 rounded-full border border-zinc-700 shadow-md" />
                    </div>
                </div>

                {/* Handles */}
                <Handle type="target" position={Position.Top} id="xlr-in-a" className="w-2.5 h-2.5 border border-zinc-900 rounded-sm" style={{ left: '30%', backgroundColor: '#22c55e' }} />
                <Handle type="target" position={Position.Top} id="xlr-in-b" className="w-2.5 h-2.5 border border-zinc-900 rounded-sm" style={{ left: '40%', backgroundColor: '#22c55e' }} />
                <Handle type="source" position={Position.Bottom} id="spk-out-a" className="w-2.5 h-2.5 border border-zinc-900 rounded-full" style={{ left: '70%', backgroundColor: '#f97316' }} />
                <Handle type="source" position={Position.Bottom} id="spk-out-b" className="w-2.5 h-2.5 border border-zinc-900 rounded-full" style={{ left: '80%', backgroundColor: '#f97316' }} />
                <Handle type="target" position={Position.Left} id="power-in" className="w-2.5 h-2.5 border border-zinc-900 rounded-full" style={{ top: '50%', backgroundColor: '#eab308' }} />
            </div>
        </RotatableNodeWrapper>
    );
};

export default AmpNode;