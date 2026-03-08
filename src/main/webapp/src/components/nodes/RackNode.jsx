import React, { useState } from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const RackNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const [isExpanded, setIsExpanded] = useState(false);

    // Stop propagation so the global double-click (config modal) doesn't trigger
    const handleDoubleClick = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div
                onDoubleClick={handleDoubleClick}
                className={`bg-zinc-900/90 border-4 border-zinc-700 rounded-sm p-2 shadow-2xl backdrop-blur-md cursor-grab transition-all duration-300 ease-in-out ${isExpanded ? 'w-[280px] h-[350px]' : 'w-[120px] h-[50px]'}`}
            >
                <div className="flex justify-between items-center border-b border-zinc-700 pb-1 mb-2 pointer-events-none">
                    <span className="text-[14px] text-zinc-400 font-bold uppercase">{data.label || '19" Rack'}</span>
                    <span className="text-[14px] bg-zinc-800 text-zinc-500 px-1 rounded">{isExpanded ? 'OPEN' : 'CLOSED'}</span>
                </div>

                {isExpanded ? (
                    <div className="w-full h-[85%] bg-black/40 border-2 border-dashed border-zinc-700 rounded-sm flex items-center justify-center pointer-events-none">
                        <span className="text-zinc-600 text-[14px] font-bold uppercase tracking-widest">Drop Equipment Here</span>
                    </div>
                ) : (
                    <div className="w-full h-2 bg-zinc-800 rounded-sm border border-zinc-700 pointer-events-none" />
                )}
            </div>
        </RotatableNodeWrapper>
    );
};

export default RackNode;