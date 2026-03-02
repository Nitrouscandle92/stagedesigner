import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box } from 'lucide-react';

const LightingNode = ({ data }) => {
    return (
        <div className="bg-zinc-900 border border-purple-500 rounded-md p-2 shadow-lg min-w-[120px] text-white">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-zinc-700">
                <Box size={14} className="text-purple-400" />
                <span className="text-xs font-bold uppercase">{data.label}</span>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                className="w-2 h-2 bg-purple-500 border-none"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-2 h-2 bg-purple-500 border-none"
            />
        </div>
    );
};

export default LightingNode;