import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const CrossoverNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-32 h-16 bg-zinc-800 border-2 border-zinc-600 rounded-sm flex items-center justify-between px-2 shadow-md cursor-grab relative">
                <span className="text-[10px] font-bold text-zinc-300 uppercase">Crossover</span>

                {/* Inputs from Mixer L/R */}
                <Handle type="target" position={Position.Left} id="in-l" className="w-3 h-3 border-2 border-zinc-900 rounded-sm" style={{ top: '30%', backgroundColor: '#22c55e' }} />
                <Handle type="target" position={Position.Left} id="in-r" className="w-3 h-3 border-2 border-zinc-900 rounded-sm" style={{ top: '70%', backgroundColor: '#22c55e' }} />

                {/* Outputs: High L/R, Low L/R */}
                <Handle type="source" position={Position.Right} id="xlr-out" className="w-2.5 h-2.5 border-2 border-zinc-900 rounded-sm" style={{ top: '20%', backgroundColor: '#ef4444' }} />
                <Handle type="source" position={Position.Right} id="xlr-out" className="w-2.5 h-2.5 border-2 border-zinc-900 rounded-sm" style={{ top: '40%', backgroundColor: '#ef4444' }} />
                <Handle type="source" position={Position.Right} id="xlr-out" className="w-2.5 h-2.5 border-2 border-zinc-900 rounded-sm" style={{ top: '60%', backgroundColor: '#ef4444' }} />
                <Handle type="source" position={Position.Right} id="xlr-out" className="w-2.5 h-2.5 border-2 border-zinc-900 rounded-sm" style={{ top: '80%', backgroundColor: '#ef4444' }} />
            </div>
        </RotatableNodeWrapper>
    );
};

export default CrossoverNode;