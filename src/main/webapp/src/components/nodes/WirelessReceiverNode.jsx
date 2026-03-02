import React from 'react';
import { Handle, Position, useEdges } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const WirelessReceiverNode = ({ id, data, selected }) => {
    const edges = useEdges();
    const rotation = data.configuration?.rotation || 0;

    const connectedMics = edges.filter(e => e.target === id && e.targetHandle?.startsWith('rf-in')).length;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[60px] h-[35px] bg-zinc-900 border-2 border-zinc-700 rounded-sm flex items-center px-2 gap-1 shadow-inner cursor-grab">
                <div className="flex flex-1 gap-1">
                    {[1, 2].map(ch => (
                        <div key={ch} className={`flex-1 h-4 border border-zinc-800 rounded-sm text-[6px] flex items-center justify-center ${ch <= connectedMics ? 'bg-cyan-900 text-cyan-400' : 'bg-black text-zinc-700'}`}>
                            CH{ch}
                        </div>
                    ))}
                </div>

                <Handle type="target" position={Position.Top} id="rf-in-1" style={{ left: '20%', backgroundColor: '#d946ef' }} />
                <Handle type="target" position={Position.Top} id="rf-in-2" style={{ left: '40%', backgroundColor: '#d946ef' }} />
                {connectedMics > 0 && <Handle type="source" position={Position.Bottom} id="xlr-out-1" style={{ left: '20%', backgroundColor: '#3b82f6' }} />}
                {connectedMics > 1 && <Handle type="source" position={Position.Bottom} id="xlr-out-2" style={{ left: '40%', backgroundColor: '#3b82f6' }} />}
                <Handle type="target" position={Position.Left} id="power-in" style={{ backgroundColor: '#eab308' }} />
            </div>
        </RotatableNodeWrapper>
    );
};

export default WirelessReceiverNode;