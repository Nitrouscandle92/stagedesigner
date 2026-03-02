import React from 'react';

const StageBoundaryNode = ({ data }) => {
    return (
        <div
            style={{ width: data.width, height: data.height }}
            className="border-4 border-dashed border-zinc-600 bg-zinc-800/30 rounded-lg flex items-end justify-center pb-4 relative"
        >
            {/* Front of stage indicator */}
            <div className="absolute bottom-0 w-3/4 h-1 bg-zinc-500 rounded-t-md opacity-50" />
            <span className="text-zinc-500 font-bold uppercase tracking-widest text-2xl opacity-40 select-none">
        {data.label || 'Stage Front'}
      </span>
        </div>
    );
};

export default StageBoundaryNode;