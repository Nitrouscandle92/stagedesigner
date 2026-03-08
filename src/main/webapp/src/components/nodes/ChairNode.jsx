import React from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const ChairNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center relative cursor-grab w-[125px] h-[125px] p-2">
                <div className="w-[90px] h-[90px] relative flex flex-col items-center justify-center">
                    <div className="w-[90px] h-[90px] bg-zinc-800 rounded-full shadow-inner border border-zinc-700 z-10 flex items-center justify-center">
                        <div className="w-[60px] h-[60px] rounded-full border border-zinc-700/30" />
                    </div>
                </div>
                <div className="absolute -bottom-4 text-[14px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default ChairNode;