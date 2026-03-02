import React from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const MusicStandNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center cursor-grab relative w-[125px] h-[125px] justify-center">

                {/* Desk (Angled back with a lip for the sheets) */}
                <div className="w-[110px] h-[65px] bg-zinc-700 border-2 border-zinc-500 -rotate-12 rounded-sm shadow-xl z-20 flex justify-center items-end pb-1.5 relative">
                    {/* Paper indication */}
                    <div className="absolute top-1 w-[80px] h-[45px] bg-zinc-200/10 rounded-sm" />
                    {/* The lip of the stand */}
                    <div className="w-[100px] h-2 bg-zinc-800 rounded-sm border-t border-zinc-600 shadow-sm z-30" />
                </div>

                {/* Pole */}
                <div className="w-2.5 h-[20px] bg-zinc-600 z-10 shadow-inner" />

                {/* Heavy Base */}
                <div className="w-[50px] h-[50px] rounded-full border-4 border-zinc-700 bg-zinc-800 z-0 shadow-lg" />

                {/* Anti-rotating Label */}
                <div className="absolute -bottom-6 text-[10px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default MusicStandNode;