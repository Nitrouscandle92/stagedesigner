import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const LightStandNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[140px] h-[40px] relative flex items-center justify-center cursor-grab">
                {/* Tripod Base */}
                <div className="absolute w-6 h-6 rounded-full border-2 border-zinc-700 bg-zinc-800 shadow-xl z-10" />

                {/* T-Bar (Main Beam) */}
                <div className="w-full h-2 bg-zinc-700 rounded-full shadow-lg border border-zinc-600" />

                {/* Mount points (visual indicators) */}
                <div className="absolute left-[20%] w-3 h-3 bg-zinc-600 rounded-sm border border-zinc-500" />
                <div className="absolute right-[20%] w-3 h-3 bg-zinc-600 rounded-sm border border-zinc-500" />

                <Handle type="source" position={Position.Top} id="mount-l" style={{ left: '20%' }} className="!w-3 !h-3 !bg-purple-500" />
                <Handle type="source" position={Position.Top} id="mount-r" style={{ left: '80%' }} className="!w-3 !h-3 !bg-purple-500" />

                <div className="absolute -bottom-6 text-[14px] text-zinc-400 font-bold uppercase tracking-tighter whitespace-nowrap" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label || 'Light Stand'}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default LightStandNode;