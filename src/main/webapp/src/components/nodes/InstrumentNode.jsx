import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';

const InstrumentNode = ({ id, data, selected }) => {
    const rotation = data.configuration?.rotation || 0;
    const useClipMic = data.configuration?.useClipMic || false;
    const instType = data.configuration?.instType || 'violin';

    const renderInstrument = () => {
        switch (instType) {
            case 'violin':
                return (
                    // Top-down Violin with neck pointing up and slightly angled
                    <div className="relative flex flex-col items-center -rotate-[20deg] drop-shadow-xl w-[60px] h-[150px] justify-center">
                        <div className="w-2 h-4 bg-amber-950 rounded-t-sm" /> {/* Scroll */}
                        <div className="w-1.5 h-14 bg-amber-900 z-10" /> {/* Neck */}
                        <div className="w-14 h-20 bg-amber-600 border-2 border-amber-800 rounded-[25px] shadow-inner -mt-2 flex flex-col justify-center items-center"> {/* Body */}
                            <div className="w-1.5 h-6 bg-zinc-900 mt-4" /> {/* Tailpiece/Bridge */}
                        </div>
                    </div>
                );
            case 'cello':
                return (
                    // Top-down Cello (larger)
                    <div className="relative flex flex-col items-center -rotate-[15deg] drop-shadow-2xl w-[120px] h-[280px] justify-center">
                        <div className="w-3 h-6 bg-amber-950 rounded-t-sm" /> {/* Scroll */}
                        <div className="w-2 h-24 bg-amber-900 z-10" /> {/* Neck */}
                        <div className="w-24 h-40 bg-amber-700 border-4 border-amber-900 rounded-[45px] shadow-inner -mt-3 flex flex-col justify-center items-center relative"> {/* Body */}
                            <div className="absolute -bottom-6 w-1 h-8 bg-zinc-400" /> {/* Endpin */}
                            <div className="w-2 h-10 bg-zinc-900 mt-12 z-20" /> {/* Tailpiece */}
                        </div>
                    </div>
                );
            case 'trumpet':
                return (
                    <div className="relative flex flex-col items-center rotate-[10deg] drop-shadow-lg w-[40px] h-[130px] justify-center">
                        <div className="w-4 h-6 bg-zinc-300 rounded-t-sm" /> {/* Mouthpiece */}
                        <div className="w-3 h-16 bg-yellow-500 border-x border-yellow-600 flex flex-col justify-evenly py-2 z-10"> {/* Valves */}
                            <div className="w-5 h-1 bg-yellow-300 -ml-1 rounded-full" />
                            <div className="w-5 h-1 bg-yellow-300 -ml-1 rounded-full" />
                            <div className="w-5 h-1 bg-yellow-300 -ml-1 rounded-full" />
                        </div>
                        <div className="w-12 h-10 bg-yellow-500 rounded-b-full shadow-inner border-b-4 border-yellow-600 -mt-1" /> {/* Bell */}
                    </div>
                );
            case 'sax':
                return (
                    <div className="relative flex flex-col items-center rotate-[25deg] drop-shadow-xl w-[60px] h-[160px] justify-center">
                        <div className="w-2 h-16 bg-zinc-800 rounded-t-sm" /> {/* Neck/Mouthpiece */}
                        <div className="w-6 h-20 bg-yellow-500 border border-yellow-600 rounded-b-full -mt-1 relative flex justify-end items-end p-1"> {/* Body */}
                            <div className="absolute -left-6 bottom-2 w-10 h-10 bg-yellow-500 rounded-full border-[3px] border-yellow-600 shadow-inner" /> {/* Bell curving out */}
                        </div>
                    </div>
                );
            case 'flute':
                return (
                    <div className="relative flex flex-col items-center rotate-[85deg] drop-shadow-md w-[20px] h-[160px] justify-center">
                        <div className="w-2.5 h-[140px] bg-zinc-300 border border-zinc-400 rounded-full flex flex-col justify-evenly items-center py-2">
                            {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />)} {/* Keys */}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center group relative cursor-grab p-4 min-w-[80px] min-h-[80px]">

                {renderInstrument()}

                {/* Clip Mic XLR Out (Green) */}
                {useClipMic && (
                    <Handle type="source" position={Position.Right} id="xlr-clip-out" className="w-3.5 h-3.5 border-2 border-zinc-950 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                )}

                {/* Anti-rotating label */}
                <div className="absolute -bottom-4 text-[10px] text-zinc-300 font-bold bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50" style={{ transform: `rotate(${-rotation}deg)` }}>
                    {data.label} {useClipMic ? '(Clip)' : ''}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};
export default InstrumentNode;