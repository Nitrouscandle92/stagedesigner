import React from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const GrandPianoNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="w-[400px] h-[550px] bg-black border-[6px] border-zinc-900 rounded-t-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-end p-2 relative cursor-grab" style={{ clipPath: 'polygon(0% 0%, 65% 0%, 100% 30%, 100% 100%, 0% 100%)' }}>
                <div className="absolute top-[20%] right-[20%] w-[250px] h-[300px] border-l-4 border-t-4 border-zinc-800 rounded-tl-[40px] opacity-40" />

                <div className="w-full h-14 bg-zinc-900 border-t-[6px] border-zinc-800 rounded-sm p-1.5 flex shadow-inner relative z-10">
                    <div className="w-full h-full bg-white flex gap-[1px]">
                        {[...Array(52)].map((_, i) => (
                            <div key={i} className="flex-1 bg-white border-r border-gray-300 relative">
                                {![0, 3, 7, 10, 14, 17, 21].includes(i % 7) && (
                                    <div className="absolute top-0 -left-[60%] w-[120%] h-2/3 bg-black z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Anti-rotating Label */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-sm font-bold text-zinc-300 uppercase tracking-widest bg-black/80 px-3 py-1.5 rounded whitespace-nowrap" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default GrandPianoNode;