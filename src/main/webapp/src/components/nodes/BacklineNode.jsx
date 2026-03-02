import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Drum } from 'lucide-react'; // Ensure lucide-react has 'Drum' or use a generic icon like 'MonitorSpeaker'

const BacklineNode = ({ data }) => {
    return (
        <div className="bg-zinc-900 border border-green-500 rounded-md p-2 shadow-lg min-w-[140px] text-white">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-zinc-700">
                <span className="text-green-400 text-xs">🥁</span>
                <span className="text-xs font-bold uppercase">{data.label}</span>
            </div>

            {/* Backline elements are usually sources for audio */}
            <Handle
                type="source"
                position={Position.Right}
                className="w-2 h-2 bg-blue-500 border-none"
            />
        </div>
    );
};

export default BacklineNode;