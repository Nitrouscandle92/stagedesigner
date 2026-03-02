import React from 'react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const DrumNode = ({ id, data, selected }) => {
    const config = data.configuration || {};
    const rotation = config.rotation || 0;

    // 1m = 250px
    const widthPx = (config.widthMeters || 2) * 250;
    const heightPx = (config.depthMeters || 2) * 250;
    const tomCount = config.tomCount ?? 2;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div
                style={{ width: widthPx, height: heightPx }}
                className="bg-zinc-800/40 border-4 border-dashed border-zinc-600 rounded-sm flex items-center justify-center relative shadow-2xl cursor-grab"
            >
                {/* Drum Kit Graphic (Fixed center size) */}
                <div className="relative w-[300px] h-[300px] z-10">
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90px] h-[90px] bg-zinc-900 rounded-full border-[3px] border-zinc-700 shadow-inner" /> {/* Snare */}
                    <div className="absolute bottom-16 right-4 w-[110px] h-[110px] bg-zinc-800 rounded-full border-[4px] border-zinc-400 shadow-xl" /> {/* Floor Tom */}

                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[130px] h-[160px] bg-zinc-950 rounded-xl border-y-[10px] border-zinc-800 shadow-2xl" /> {/* Kick */}

                    {/* Dynamic Toms */}
                    {tomCount > 0 && <div className="absolute top-24 left-16 w-[80px] h-[80px] bg-zinc-800 rounded-full border-[4px] border-zinc-400 shadow-md" />}
                    {tomCount > 1 && <div className="absolute top-24 right-16 w-[80px] h-[80px] bg-zinc-800 rounded-full border-[4px] border-zinc-400 shadow-md" />}
                    {tomCount > 2 && <div className="absolute top-36 right-0 w-[70px] h-[70px] bg-zinc-800 rounded-full border-[4px] border-zinc-400 shadow-md" />}
                    {tomCount > 3 && <div className="absolute top-36 left-0 w-[70px] h-[70px] bg-zinc-800 rounded-full border-[4px] border-zinc-400 shadow-md" />}

                    {/* Cymbals */}
                    <div className="absolute top-24 -left-6 w-[140px] h-[140px] bg-yellow-600/90 rounded-full border border-yellow-400 shadow-[0_0_15px_rgba(202,138,4,0.3)]" />
                    <div className="absolute top-8 -right-4 w-[150px] h-[150px] bg-yellow-600/90 rounded-full border border-yellow-400 shadow-[0_0_15px_rgba(202,138,4,0.3)]" />
                </div>

                <div className="absolute top-4 left-4 text-sm font-bold text-zinc-300 uppercase tracking-widest bg-black/70 px-2 py-1 rounded" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default DrumNode;