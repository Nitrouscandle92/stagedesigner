package com.stageplot.core.logic;

import com.stageplot.core.domain.ConnectionType;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class CableColorService {

    private final Map<ConnectionType, String[]> palettes = Map.of(
            ConnectionType.AUDIO, new String[]{"#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"},
            ConnectionType.POWER, new String[]{"#dc2626", "#ef4444", "#f87171", "#fb923c"},
            ConnectionType.LIGHTING, new String[]{"#9333ea", "#a855f7", "#c084fc", "#e879f9"}
    );

    public String getNextColor(ConnectionType type, int index) {
        String[] colors = palettes.getOrDefault(type, new String[]{"#ffffff"});
        return colors[index % colors.length];
    }
}