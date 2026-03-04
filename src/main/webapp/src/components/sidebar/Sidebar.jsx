import React from 'react';

const elements = [
    // ... (Microphones & Instruments wie zuvor)
    { type: 'vocal_mic', label: 'Gesangs-Mic', icon: '🎤', category: 'INPUT' },
    { type: 'choir_mic', label: 'Chor-Mic', icon: '🎙️', category: 'INPUT' },
    { type: 'pulpit_mic', label: 'Pult-Mic', icon: '🎤', category: 'INPUT' },
    { type: 'wireless_mic', label: 'Wireless-Mic', icon: '📶', category: 'INPUT' },

    { type: 'drum', label: 'Drum Kit', icon: '🥁', category: 'BACKLINE' },
    { type: 'eguitar', label: 'E-Gitarre', icon: '⚡', category: 'BACKLINE' },
    { type: 'ebass', label: 'E-Bass', icon: '🎸', category: 'BACKLINE' },
    { type: 'acoustic_guitar', label: 'Akustik Gitarre', icon: '🎸', category: 'BACKLINE' },
    { type: 'grand_piano', label: 'Flügel', icon: '🎹', category: 'BACKLINE' },
    { type: 'epiano', label: 'E-Piano', icon: '🎹', category: 'BACKLINE' },
    { type: 'upright_piano', label: 'E-Klavier', icon: '🎹', category: 'BACKLINE' },
    { type: 'violin', label: 'Violin / Viola', icon: '🎻', category: 'BACKLINE' },
    { type: 'cello', label: 'Chello', icon: '🎻', category: 'BACKLINE' },
    { type: 'trumpet', label: 'Trompete', icon: '🎺', category: 'BACKLINE' },
    { type: 'trombone', label: 'Posaune', icon: '🎺', category: 'BACKLINE' },
    { type: 'frenchhorn', label: 'Waldhorn', icon: '📯', category: 'BACKLINE' },
    { type: 'saxophone', label: 'Saxophon', icon: '🎷', category: 'BACKLINE' },
    { type: 'flute', label: 'Flöte', icon: '🪈️', category: 'BACKLINE' },
    { type: 'kazoo', label: 'Kazoo', icon: '', category: 'BACKLINE' },
    { type: 'cajon', label: 'Cajon', icon: '📦', category: 'BACKLINE' },
    { type: 'steeldrum', label: 'Steel Drum', icon: '🛸', category: 'BACKLINE' },
    { type: 'glockenspiel', label: 'Glockenspiel', icon: '🎹', category: 'BACKLINE' },
    { type: 'triangle', label: 'Triangel', icon: '⏃', category: 'BACKLINE' },

    // Lighting Section
    { type: 'light_stand', label: 'Lichtständer', icon: '🗼', category: 'LIGHTING' },
    { type: 'moving_head', label: 'Moving Head', icon: '💡', category: 'LIGHTING' },
    { type: 'arri_spot', label: 'Arri Spot', icon: '💡', category: 'LIGHTING' },
    { type: 'rgb_spot', label: 'RGB Spot', icon: '💡', category: 'LIGHTING' },
    { type: 'arri_controller', label: 'Arri Controller', icon: '🎛️', category: 'LIGHTING' },
    { type: 'dmx_controller', label: 'DMX Controller', icon: '💻', category: 'LIGHTING' },

    { type: 'monitor', label: 'Monitor', icon: '🔈', category: 'AUDIO' },
    { type: 'speaker', label: 'Speaker Stack (JRX)', icon: '🔊', category: 'AUDIO' },

    { type: 'stagebox', label: 'Stagebox', icon: '🎛 ', category: 'ROUTING' },
    { type: 'mixer', label: 'Mixer', icon: '🎚️', category: 'ROUTING' },
    { type: 'di800', label: 'DI Box', icon: '🎛️', category: 'ROUTING' },
    { type: 'wireless_receiver', label: 'Wireless Receiver', icon: '📻', category: 'ROUTING' },
    { type: 'amp', label: 'Power Amp', icon: '🔌', category: 'ROUTING' },
    { type: 'crossover', label: 'Crossover', icon: '🎛️', category: 'ROUTING' },
    //{ type: 'rack', label: '19" Rack', icon: '🗄️', category: 'ROUTING' },

    { type: 'chair', label: 'Stuhl', icon: '🪑', category: 'STAGE' },
    { type: 'music_stand', label: 'Notenpult', icon: '🎼', category: 'STAGE' },
    { type: 'power', label: 'Stromquelle', icon: '⚡', category: 'POWER' }
];

const groupedElements = {
    'Microphones': elements.filter(e => e.category === 'INPUT'),
    'Drums & Percussion': elements.filter(e => ['drum', 'cajon', 'steeldrum', 'glockenspiel', 'triangle'].includes(e.type)),
    'Keyboards & Pianos': elements.filter(e => ['grand_piano', 'epiano', 'upright_piano'].includes(e.type)),
    'Guitars & Bass': elements.filter(e => ['eguitar', 'ebass', 'acoustic_guitar'].includes(e.type)),
    'Strings': elements.filter(e => ['violin', 'cello'].includes(e.type)),
    'Winds & Brass': elements.filter(e => ['trumpet', 'trombone', 'frenchhorn', 'saxophone', 'flute', 'kazoo'].includes(e.type)),
    'Lighting & Effects': elements.filter(e => e.category === 'LIGHTING'),
    'Monitoring & PA': elements.filter(e => e.category === 'AUDIO'),
    'Routing & Infrastructure': elements.filter(e => e.category === 'ROUTING'),
    'Stage & Power': elements.filter(e => ['STAGE', 'POWER'].includes(e.category))
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
                    items.length > 0 && (
                        <div key={groupName}>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">{groupName}</h3>
                            <div className="flex flex-col gap-2">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-2.5 bg-zinc-800 border border-zinc-700 rounded-md cursor-grab hover:bg-zinc-700 transition-colors group"
                                        onDragStart={(event) => onDragStart(event, item.type, item.label, item.category)}
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
                    )
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;