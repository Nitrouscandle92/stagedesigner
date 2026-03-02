import React from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const ChairNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center relative cursor-grab w-[125px] h-[125px] p-2">
                <div className="w-[100px] h-[110px] relative flex flex-col items-center">
                    <div className="w-[90px] h-[20px] bg-zinc-700 rounded-t-lg shadow-lg absolute top-0 z-20" />
                    <div className="w-[100px] h-[90px] bg-zinc-800 rounded-b-xl rounded-t-md shadow-inner border border-zinc-700 mt-2 z-10" />
                </div>
                <div className="absolute -bottom-4 text-[10px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export default ChairNode;