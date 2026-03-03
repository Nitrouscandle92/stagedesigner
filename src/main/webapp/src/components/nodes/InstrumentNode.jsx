import React from 'react';
import { Handle, Position } from '@xyflow/react';
import RotatableNodeWrapper from './RotatableNodeWrapper';
import '../../styles/instruments.css';

const SVGDefs = () => (
    <defs>
        <linearGradient id="wood-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d28f5a" />
            <stop offset="50%" stopColor="#a0522d" />
            <stop offset="100%" stopColor="#5c2e0b" />
        </linearGradient>
        <linearGradient id="brass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#713f12" />
        </linearGradient>
        <linearGradient id="silver-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="steel-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="80%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
        </radialGradient>
    </defs>
);

const BaseInstrument = ({ id, data, selected, width, height, children }) => {
    const rotation = data.configuration?.rotation || 0;
    const useClipMic = data.configuration?.useClipMic || false;

    return (
        <RotatableNodeWrapper id={id} selected={selected} rotation={rotation}>
            <div className="flex flex-col items-center justify-center relative cursor-grab" style={{ width, height }}>
                {children}

                {useClipMic && (
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="xlr-clip-out"
                        className="w-3.5 h-3.5 border-2 border-zinc-950 rounded-full shadow-md z-[60] !right-[-8px]"
                        style={{ backgroundColor: '#22c55e' }}
                    />
                )}

                <div
                    className="absolute -bottom-8 text-[10px] text-zinc-100 font-bold bg-zinc-900/95 border border-zinc-700 px-2 py-1 rounded whitespace-nowrap z-50 shadow-xl pointer-events-none"
                    style={{ transform: `rotate(${-rotation}deg)` }}
                >
                    {data.label} {useClipMic ? '(Clip)' : ''}
                </div>
            </div>
        </RotatableNodeWrapper>
    );
};

export const ViolinNode = (props) => (
    <BaseInstrument {...props} width={40} height={90}>
        <svg viewBox="0 0 40 90" className="w-full h-full drop-shadow-xl">
            <SVGDefs />
            <rect x="18" y="5" width="4" height="35" className="inst-dark" />
            <circle cx="20" cy="5" r="3.5" fill="#5c2e0b" />
            <path d="M 20 25 C 32 25 32 45 24 50 C 34 55 34 85 20 85 C 6 85 6 55 16 50 C 8 45 8 25 20 25 Z" className="inst-wood" />
            <path d="M 14 50 C 12 55 16 60 14 65 M 26 50 C 28 55 24 60 26 65" fill="none" stroke="#1a0a01" strokeWidth="1" />
            <rect x="15" y="68" width="10" height="2" fill="#eaddcf" />
            <polygon points="17,75 23,75 20,85" className="inst-dark" />
            <line x1="20" y1="5" x2="20" y2="75" stroke="#fff" strokeWidth="0.5" opacity="0.6" />
        </svg>
    </BaseInstrument>
);

export const CelloNode = (props) => (
    <BaseInstrument {...props} width={60} height={140}>
        <svg viewBox="0 0 60 140" className="w-full h-full drop-shadow-xl">
            <SVGDefs />
            <line x1="30" y1="125" x2="30" y2="140" stroke="#94a3b8" strokeWidth="2" />
            <rect x="27" y="10" width="6" height="50" className="inst-dark" />
            <circle cx="30" cy="10" r="4" fill="#5c2e0b" />
            <path d="M 30 35 C 50 35 50 65 38 75 C 55 85 55 125 30 125 C 5 125 5 85 22 75 C 10 65 10 35 30 35 Z" className="inst-wood" />
            <path d="M 20 75 C 16 85 24 95 20 105 M 40 75 C 44 85 36 95 40 105" fill="none" stroke="#1a0a01" strokeWidth="1.5" />
            <rect x="22" y="100" width="16" height="2.5" fill="#eaddcf" />
            <polygon points="25,110 35,110 30,125" className="inst-dark" />
            <line x1="30" y1="10" x2="30" y2="110" stroke="#fff" strokeWidth="0.5" opacity="0.6" />
        </svg>
    </BaseInstrument>
);

export const TrumpetNode = (props) => (
    <BaseInstrument {...props} width={90} height={30}>
        <svg viewBox="0 0 90 30" className="w-full h-full drop-shadow-md">
            <SVGDefs />
            <rect x="5" y="12" width="60" height="4" className="inst-brass" />
            <rect x="10" y="8" width="40" height="3" fill="none" stroke="url(#brass-grad)" strokeWidth="3" rx="1.5" />
            <rect x="10" y="17" width="40" height="3" fill="none" stroke="url(#brass-grad)" strokeWidth="3" rx="1.5" />
            <polygon points="65,11 85,2 85,26 65,17" className="inst-brass" />
            <rect x="2" y="10" width="3" height="8" className="inst-silver" rx="1" />
            <rect x="30" y="4" width="3" height="12" className="inst-silver" />
            <rect x="36" y="4" width="3" height="12" className="inst-silver" />
            <rect x="42" y="4" width="3" height="12" className="inst-silver" />
        </svg>
    </BaseInstrument>
);

export const TromboneNode = (props) => (
    <BaseInstrument {...props} width={130} height={35}>
        <svg viewBox="0 0 130 35" className="w-full h-full drop-shadow-md">
            <SVGDefs />
            <rect x="5" y="10" width="80" height="3.5" className="inst-brass" />
            <rect x="5" y="20" width="80" height="3.5" className="inst-brass" />
            <path d="M 85 10 C 95 10 95 23.5 85 23.5" fill="none" stroke="url(#brass-grad)" strokeWidth="3.5" />
            <rect x="30" y="7" width="60" height="3.5" className="inst-brass" />
            <polygon points="90,7 125,1 125,16.5 90,10.5" className="inst-brass" />
            <rect x="2" y="8" width="3" height="7" className="inst-silver" rx="1" />
            <line x1="30" y1="10" x2="30" y2="20" stroke="url(#brass-grad)" strokeWidth="2" />
        </svg>
    </BaseInstrument>
);

export const FrenchHornNode = (props) => (
    <BaseInstrument {...props} width={50} height={50}>
        <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
            <SVGDefs />
            <circle cx="25" cy="25" r="16" fill="none" stroke="url(#brass-grad)" strokeWidth="3" />
            <circle cx="25" cy="25" r="12" fill="none" stroke="url(#brass-grad)" strokeWidth="2" />
            <path d="M 38 15 C 50 10 50 0 45 0 C 40 0 35 8 32 15 Z" className="inst-brass" />
            <path d="M 12 35 C 5 45 0 50 5 50 C 10 50 18 40 20 32" fill="none" stroke="url(#brass-grad)" strokeWidth="2.5" />
            <rect x="3" y="47" width="5" height="3" className="inst-silver" transform="rotate(-45 5 48)" />
            <circle cx="25" cy="25" r="5" className="inst-silver" />
            <line x1="25" y1="20" x2="25" y2="30" stroke="#fff" strokeWidth="1" />
            <line x1="20" y1="25" x2="30" y2="25" stroke="#fff" strokeWidth="1" />
        </svg>
    </BaseInstrument>
);

export const SaxophoneNode = (props) => (
    <BaseInstrument {...props} width={45} height={90}>
        <svg viewBox="0 0 45 90" className="w-full h-full drop-shadow-md">
            <SVGDefs />
            <rect x="20" y="5" width="4" height="10" className="inst-dark" />
            <path d="M 22 15 Q 26 25 22 35" fill="none" stroke="url(#brass-grad)" strokeWidth="4" />
            <path d="M 20 35 L 24 35 L 30 70 L 20 75 Z" className="inst-brass" />
            <path d="M 25 72 C 35 85 10 90 10 75 L 10 65" fill="none" stroke="url(#brass-grad)" strokeWidth="6" />
            <ellipse cx="10" cy="65" rx="6" ry="3" className="inst-brass" />
            <line x1="26" y1="40" x2="26" y2="65" stroke="url(#silver-grad)" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
    </BaseInstrument>
);

export const FluteNode = (props) => (
    <BaseInstrument {...props} width={100} height={12}>
        <svg viewBox="0 0 100 12" className="w-full h-full drop-shadow-sm">
            <SVGDefs />
            <rect x="2" y="3" width="96" height="6" rx="3" className="inst-silver" />
            <rect x="15" y="2" width="8" height="8" rx="2" className="inst-silver" />
            <circle cx="19" cy="6" r="1.5" className="inst-dark" />
            <circle cx="35" cy="6" r="1.5" className="inst-dark" />
            <circle cx="45" cy="6" r="1.5" className="inst-dark" />
            <circle cx="55" cy="6" r="1.5" className="inst-dark" />
            <circle cx="65" cy="6" r="1.5" className="inst-dark" />
            <circle cx="75" cy="6" r="1.5" className="inst-dark" />
            <circle cx="85" cy="6" r="1.5" className="inst-dark" />
        </svg>
    </BaseInstrument>
);

export const KazooNode = (props) => (
    <BaseInstrument {...props} width={50} height={15}>
        <svg viewBox="0 0 50 15" className="w-full h-full drop-shadow-md">
            <path d="M 5 7.5 C 5 2 45 2 45 7.5 C 45 13 5 13 5 7.5 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
            <rect x="28" y="1" width="8" height="4" fill="#eab308" />
            <circle cx="32" cy="1" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <ellipse cx="5" cy="7.5" rx="2" ry="4" className="inst-dark" />
        </svg>
    </BaseInstrument>
);

export const CajonNode = (props) => (
    <BaseInstrument {...props} width={45} height={45}>
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-lg">
            <SVGDefs />
            <rect x="2" y="2" width="41" height="41" rx="2" className="inst-wood" />
            <circle cx="22.5" cy="22.5" r="9" className="inst-dark" opacity="0.8" />
            <circle cx="6" cy="6" r="1" className="inst-dark" />
            <circle cx="39" cy="6" r="1" className="inst-dark" />
            <circle cx="6" cy="39" r="1" className="inst-dark" />
            <circle cx="39" cy="39" r="1" className="inst-dark" />
            <line x1="2" y1="12" x2="43" y2="12" stroke="#5c2e0b" strokeWidth="0.5" opacity="0.4" />
            <line x1="2" y1="28" x2="43" y2="28" stroke="#5c2e0b" strokeWidth="0.5" opacity="0.4" />
        </svg>
    </BaseInstrument>
);

export const SteelDrumNode = (props) => (
    <BaseInstrument {...props} width={60} height={60}>
        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-lg">
            <SVGDefs />
            <circle cx="30" cy="30" r="28" fill="url(#steel-grad)" stroke="#475569" strokeWidth="2" />
            <path d="M 30 8 A 22 22 0 0 1 52 30" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 52 30 A 22 22 0 0 1 30 52" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 30 52 A 22 22 0 0 1 8 30" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 8 30 A 22 22 0 0 1 30 8" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="45" cy="20" r="3" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="20" cy="45" r="3" fill="none" stroke="#94a3b8" strokeWidth="1" />
        </svg>
    </BaseInstrument>
);

export const GlockenspielNode = (props) => (
    <BaseInstrument {...props} width={80} height={35}>
        <svg viewBox="0 0 80 35" className="w-full h-full drop-shadow-md">
            <SVGDefs />
            <rect x="2" y="2" width="76" height="31" rx="2" className="inst-wood" />
            <rect x="8" y="5" width="6" height="25" className="inst-silver" rx="1" />
            <rect x="16" y="6" width="6" height="23" className="inst-silver" rx="1" />
            <rect x="24" y="7" width="6" height="21" className="inst-silver" rx="1" />
            <rect x="32" y="8" width="6" height="19" className="inst-silver" rx="1" />
            <rect x="40" y="9" width="6" height="17" className="inst-silver" rx="1" />
            <rect x="48" y="10" width="6" height="15" className="inst-silver" rx="1" />
            <rect x="56" y="11" width="6" height="13" className="inst-silver" rx="1" />
            <rect x="64" y="12" width="6" height="11" className="inst-silver" rx="1" />
        </svg>
    </BaseInstrument>
);

export const TriangleNode = (props) => (
    <BaseInstrument {...props} width={40} height={40}>
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
            <SVGDefs />

            <line x1="20" y1="0" x2="20" y2="6" stroke="#94a3b8" strokeWidth="1" />

            <polyline
                points="25,15 35,35 5,35 20,6"
                fill="none"
                stroke="url(#silver-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <line x1="22" y1="22" x2="38" y2="10" stroke="url(#silver-grad)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="38" cy="10" r="2" fill="#1a1a1a" />
        </svg>
    </BaseInstrument>
);