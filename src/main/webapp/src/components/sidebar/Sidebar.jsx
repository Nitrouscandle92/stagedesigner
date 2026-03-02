import React from 'react';
import {
    Mic, Speaker, Layers, Sliders, Box, Zap, Drum,
    Music, Server, Wifi, Radio, Keyboard, Armchair, FileText
} from 'lucide-react';

const elements = [
    // --- INPUTS & MICROPHONES ---
    { type: 'vocal_mic', label: 'Vocal Mic', icon: <Mic size={18} />, category: 'INPUT' },
    { type: 'choir_mic', label: 'Choir Mic', icon: <Mic size={18} />, category: 'INPUT' },
    { type: 'pulpit_mic', label: 'Pulpit Mic', icon: <Mic size={18} />, category: 'INPUT' },
    { type: 'wireless_mic', label: 'Wireless Mic', icon: <Wifi size={18} />, category: 'INPUT' },
    { type: 'wireless_receiver', label: 'RF Receiver', icon: <Radio size={18} />, category: 'ROUTING' },

    // --- BACKLINE & INSTRUMENTS ---
    { type: 'drum', label: 'Drum Kit', icon: <Drum size={18} />, category: 'BACKLINE' },
    { type: 'eguitar', label: 'E-Guitar', icon: <Music size={18} />, category: 'BACKLINE' },
    { type: 'ebass', label: 'E-Bass', icon: <Music size={18} />, category: 'BACKLINE' },
    { type: 'acoustic_guitar', label: 'Acoustic Guitar', icon: <Music size={18} />, category: 'BACKLINE' },
    { type: 'grand_piano', label: 'Grand Piano', icon: <Music size={18} />, category: 'BACKLINE' },
    { type: 'epiano', label: 'E-Piano', icon: <Keyboard size={18} />, category: 'BACKLINE' },
    { type: 'upright_piano', label: 'Upright Piano', icon: <Music size={18} />, category: 'BACKLINE' },
    { type: 'instrument', label: 'Orchestra/Brass', icon: <Music size={18} />, category: 'BACKLINE' },

    // --- MONITORING & PA ---
    { type: 'monitor', label: 'Wedge Monitor', icon: <Speaker size={18} />, category: 'AUDIO' },
    { type: 'speaker', label: 'PA Stack (JRX)', icon: <Speaker size={18} />, category: 'AUDIO' },

    // --- ROUTING & INFRASTRUCTURE ---
    { type: 'stagebox', label: 'Stagebox (S16)', icon: <Box size={18} />, category: 'ROUTING' },
    { type: 'mixer', label: 'X32 Producer', icon: <Sliders size={18} />, category: 'ROUTING' },
    { type: 'di800', label: 'Behringer DI800', icon: <Box size={18} />, category: 'ROUTING' },
    { type: 'amp', label: 'Amp (EP4000)', icon: <Zap size={18} />, category: 'ROUTING' },
    { type: 'crossover', label: 'Crossover / DSP', icon: <Sliders size={18} />, category: 'ROUTING' },
    { type: 'rack', label: '19" Rack', icon: <Server size={18} />, category: 'ROUTING' },

    // --- STAGE & POWER ---
    { type: 'chair', label: 'Chair', icon: <Armchair size={18} />, category: 'STAGE' },
    { type: 'music_stand', label: 'Music Stand', icon: <FileText size={18} />, category: 'STAGE' },
    { type: 'power', label: 'Power Distro', icon: <Zap size={18} />, category: 'POWER' },
    { type: 'lighting', label: 'Truss / Light', icon: <Layers size={18} />, category: 'LIGHTING' }
];

const Sidebar = () => {
    const onDragStart = (event, nodeType, label, category, config = {}) => {
        event.dataTransfer.setData('application/@xyflow/react', nodeType);
        event.dataTransfer.setData('application/label', label);
        event.dataTransfer.setData('application/category', category);
        event.dataTransfer.setData('application/config', JSON.stringify(config));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col gap-4 z-10 shadow-xl overflow-y-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Equipment Inventory</h2>
            <div className="flex flex-col gap-2">
                {elements.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-zinc-800 border border-zinc-700 rounded-md cursor-grab hover:bg-zinc-700 transition-colors group"
                        onDragStart={(event) => onDragStart(event, item.type, item.label, item.category, item.config)}
                        draggable
                    >
                        <div className="text-blue-500 group-hover:text-blue-400 transition-colors">
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium text-white">{item.label}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;