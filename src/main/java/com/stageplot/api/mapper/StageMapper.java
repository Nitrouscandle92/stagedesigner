package com.stageplot.api.mapper;

import com.stageplot.api.dto.ConnectionDto;
import com.stageplot.api.dto.StageDto;
import com.stageplot.api.dto.StageElementDto;
import com.stageplot.core.domain.Connection;
import com.stageplot.core.domain.ConnectionType;
import com.stageplot.core.domain.Stage;
import com.stageplot.core.domain.StageElement;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StageMapper {

    public Stage toEntity(StageDto dto) {
        if (dto == null) return null;

        Stage stage = new Stage();
        stage.setId(dto.getId());
        stage.setVersion(dto.getVersion());
        stage.setName(dto.getName());
        stage.setWidthMeters(dto.getWidthMeters());
        stage.setDepthMeters(dto.getDepthMeters());

        stage.setElements(mapElementsToEntity(dto.getElements(), stage));
        stage.setConnections(mapConnectionsToEntity(dto.getConnections(), stage));

        return stage;
    }

    private List<StageElement> mapElementsToEntity(List<StageElementDto> dtos, Stage stage) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().map(e -> {
            StageElement element = new StageElement();
            element.setId(e.getId());
            element.setLabel(e.getLabel());
            element.setCategory(e.getCategory());
            element.setX(e.getX());
            element.setY(e.getY());
            element.setStage(stage);
            element.setWidth(e.getWidth());
            element.setHeight(e.getHeight());
            if (e.getConfiguration() != null) {
                element.setConfiguration(new HashMap<>(e.getConfiguration()));
            }
            return element;
        }).collect(Collectors.toList());
    }

    private List<Connection> mapConnectionsToEntity(List<ConnectionDto> dtos, Stage stage) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().map(c -> {
            Connection conn = new Connection();
            conn.setId(c.getId());
            conn.setSourceId(c.getSourceId());
            conn.setTargetId(c.getTargetId());
            conn.setType(safeMapType(c.getType()));
            conn.setHexColor(c.getHexColor());
            conn.setStage(stage);
            return conn;
        }).collect(Collectors.toList());
    }

    private ConnectionType safeMapType(Object type) {
        if (type == null) return ConnectionType.AUDIO;
        try {
            return ConnectionType.valueOf(type.toString().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ConnectionType.AUDIO;
        }
    }

    public StageDto toDto(Stage entity) {
        if (entity == null) return null;

        StageDto dto = new StageDto();
        dto.setId(entity.getId());
        dto.setVersion(entity.getVersion());
        dto.setName(entity.getName());
        dto.setWidthMeters(entity.getWidthMeters());
        dto.setDepthMeters(entity.getDepthMeters());

        if (entity.getElements() != null) {
            dto.setElements(entity.getElements().stream().map(this::toElementDto).collect(Collectors.toList()));
        }

        if (entity.getConnections() != null) {
            dto.setConnections(entity.getConnections().stream().map(this::toConnectionDto).collect(Collectors.toList()));
        }

        return dto;
    }

    private StageElementDto toElementDto(StageElement e) {
        StageElementDto dto = new StageElementDto();
        dto.setId(e.getId());
        dto.setLabel(e.getLabel());
        dto.setCategory(e.getCategory());
        dto.setX(e.getX());
        dto.setY(e.getY());
        dto.setWidth(e.getWidth());
        dto.setHeight(e.getHeight());
        if (e.getConfiguration() != null) {
            dto.setConfiguration(new HashMap<>(e.getConfiguration()));
        }
        return dto;
    }

    private ConnectionDto toConnectionDto(Connection c) {
        ConnectionDto dto = new ConnectionDto();
        dto.setId(c.getId());
        dto.setSourceId(c.getSourceId());
        dto.setTargetId(c.getTargetId());
        dto.setType(c.getType());
        dto.setHexColor(c.getHexColor());
        return dto;
    }
}