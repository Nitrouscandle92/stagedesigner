import React from 'react';

const elements = [
    { type: 'vocal_mic', label: 'Vocal Mic', icon: '🎤', category: 'INPUT' },
    { type: 'choir_mic', label: 'Choir Mic', icon: '🎙️', category: 'INPUT' },
    { type: 'pulpit_mic', label: 'Pulpit Mic', icon: '🎤', category: 'INPUT' },
    { type: 'wireless_mic', label: 'Wireless Mic', icon: '📶', category: 'INPUT' },

    { type: 'drum', label: 'Drum Kit', icon: '🥁', category: 'BACKLINE' },
    { type: 'eguitar', label: 'E-Guitar', icon: '⚡', category: 'BACKLINE' },
    { type: 'ebass', label: 'E-Bass', icon: '🎸', category: 'BACKLINE' },
    { type: 'acoustic_guitar', label: 'Acoustic Guitar', icon: '🎸', category: 'BACKLINE' },
    { type: 'grand_piano', label: 'Grand Piano', icon: '🎹', category: 'BACKLINE' },
    { type: 'epiano', label: 'E-Piano', icon: '🎹', category: 'BACKLINE' },
    { type: 'upright_piano', label: 'Upright Piano', icon: '🎹', category: 'BACKLINE' },
    { type: 'violin', label: 'Violin / Viola', icon: '🎻', category: 'BACKLINE' },
    { type: 'cello', label: 'Cello', icon: '🎻', category: 'BACKLINE' },
    { type: 'trumpet', label: 'Trumpet', icon: '🎺', category: 'BACKLINE' },
    { type: 'trombone', label: 'Trombone', icon: '🎺', category: 'BACKLINE' },
    { type: 'frenchhorn', label: 'French Horn', icon: '📯', category: 'BACKLINE' },
    { type: 'saxophone', label: 'Saxophone', icon: '🎷', category: 'BACKLINE' },
    { type: 'flute', label: 'Flute', icon: '🌬️', category: 'BACKLINE' },
    { type: 'kazoo', label: 'Kazoo', icon: '🥳', category: 'BACKLINE' },
    { type: 'cajon', label: 'Cajon', icon: '📦', category: 'BACKLINE' },
    { type: 'steeldrum', label: 'Steel Drum', icon: '🛸', category: 'BACKLINE' },
    { type: 'glockenspiel', label: 'Chimes', icon: '🎹', category: 'BACKLINE' },
    { type: 'triangle', label: 'Triangle', icon: '⏃', category: 'BACKLINE' },

    { type: 'monitor', label: 'Wedge Monitor', icon: '🔈', category: 'AUDIO' },
    { type: 'speaker', label: 'PA Stack (JRX)', icon: '🔊', category: 'AUDIO' },

    { type: 'stagebox', label: 'Stagebox (S16)', icon: '🔌', category: 'ROUTING' },
    { type: 'mixer', label: 'X32 Producer', icon: '🎚️', category: 'ROUTING' },
    { type: 'di800', label: 'Behringer DI800', icon: '🎛️', category: 'ROUTING' },
    { type: 'wireless_receiver', label: 'RF Receiver', icon: '📻', category: 'ROUTING' },
    { type: 'amp', label: 'Amp (EP4000)', icon: '📻', category: 'ROUTING' },
    { type: 'crossover', label: 'Crossover / DSP', icon: '🎛️', category: 'ROUTING' },
    { type: 'rack', label: '19" Rack', icon: '🗄️', category: 'ROUTING' },

    { type: 'chair', label: 'Chair', icon: '🪑', category: 'STAGE' },
    { type: 'music_stand', label: 'Music Stand', icon: '🎼', category: 'STAGE' },
    { type: 'power', label: 'Power Distro', icon: '⚡', category: 'POWER' },
    { type: 'lighting', label: 'Truss / Light', icon: '💡', category: 'LIGHTING' }
];

const groupedElements = {
    'Inputs & Microphones': elements.filter(e => e.category === 'INPUT'),
    'Backline & Instruments': elements.filter(e => e.category === 'BACKLINE'),
    'Monitoring & PA': elements.filter(e => e.category === 'AUDIO'),
    'Routing & Infrastructure': elements.filter(e => e.category === 'ROUTING'),
    'Stage & Power': elements.filter(e => ['STAGE', 'POWER', 'LIGHTING'].includes(e.category))
};

const Sidebar = () => {
    const onDragStart = (event, nodeType, label, category, config = {}) => {
        event.dataTransfer.setData('application/@xyflow/react', nodeType);
        event.dataTransfer.setData('application/label', label);
        event.dataTransfer.setData('application/category', category);
        event.dataTransfer.setData('application/config', JSON.stringify(config));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full shadow-xl">
            <div className="p-4 border-b border-zinc-800 shrink-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Equipment Inventory</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {Object.entries(groupedElements).map(([groupName, items]) => (
                    <div key={groupName}>
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">{groupName}</h3>
                        <div className="flex flex-col gap-2">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-2.5 bg-zinc-800 border border-zinc-700 rounded-md cursor-grab hover:bg-zinc-700 transition-colors group"
                                    onDragStart={(event) => onDragStart(event, item.type, item.label, item.category, item.config)}
                                    draggable
                                >
                                    <div className="text-lg grayscale group-hover:grayscale-0 transition-all duration-200">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-medium text-zinc-200 group-hover:text-white">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;