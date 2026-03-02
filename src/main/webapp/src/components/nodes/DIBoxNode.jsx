import React from 'react';
import { Handle, Position } from '@xyflow/react';

const DI800Node = ({ id, data }) => {
    return (
        <div className="w-[120px] h-[35px] bg-zinc-800 border-2 border-zinc-600 rounded-sm flex flex-col justify-center p-1 relative shadow-lg">
            <div className="text-[6px] text-zinc-500 font-mono mb-1">ULTRA-DI PRO DI800</div>

            {/* 8 Channel Indicators */}
            <div className="flex justify-between px-1">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-zinc-900 rounded-full border border-zinc-700" />
                ))}
            </div>

            {/* Inputs (Inst - Purple) on Top */}
            {[...Array(8)].map((_, i) => (
                <Handle
                    key={`in-${i}`}
                    type="target"
                    position={Position.Top}
                    id={`inst-in-${i+1}`}
                    style={{ left: `${10 + i * 11}%`, backgroundColor: '#a855f7' }}
                />
            ))}

            {/* Outputs (XLR - Blue) on Bottom */}
            {[...Array(8)].map((_, i) => (
                <Handle
                    key={`out-${i}`}
                    type="source"
                    position={Position.Bottom}
                    id={`xlr-out-${i+1}`}
                    style={{ left: `${10 + i * 11}%`, backgroundColor: '#3b82f6' }}
                />
            ))}

            {/* Power (Yellow) */}
            <Handle type="target" position={Position.Left} id="power-in" style={{ backgroundColor: '#eab308' }} />
        </div>
    );
};

export default DI800Node;