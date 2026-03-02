package com.stageplot.api.mapper;

import com.stageplot.api.dto.ConnectionDto;
import com.stageplot.api.dto.StageDto;
import com.stageplot.api.dto.StageElementDto;
import com.stageplot.core.domain.Connection;
import com.stageplot.core.domain.Stage;
import com.stageplot.core.domain.StageElement;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.stream.Collectors;

@Component
public class StageMapper {

    public Stage toEntity(StageDto dto) {
        if (dto == null) return null;

        Stage stage = new Stage();
        stage.setId(dto.getId());
        stage.setName(dto.getName());
        stage.setWidthMeters(dto.getWidthMeters());
        stage.setDepthMeters(dto.getDepthMeters());

        if (dto.getElements() != null) {
            stage.setElements(dto.getElements().stream().map(e -> {
                StageElement element = new StageElement();
                element.setId(e.getId());
                element.setLabel(e.getLabel());
                element.setCategory(e.getCategory());
                element.setX(e.getX());
                element.setY(e.getY());
                element.setWidth(e.getWidth());
                element.setHeight(e.getHeight());

                if (e.getConfiguration() != null) {
                    element.setConfiguration(new HashMap<>(e.getConfiguration()));
                }

                element.setStage(stage);
                return element;
            }).collect(Collectors.toList()));
        }

        if (dto.getConnections() != null) {
            stage.setConnections(dto.getConnections().stream().map(c -> {
                Connection conn = new Connection();
                conn.setId(c.getId());
                conn.setSourceId(c.getSourceId());
                conn.setTargetId(c.getTargetId());
                conn.setType(c.getType());
                conn.setHexColor(c.getHexColor());
                conn.setSourceChannel(c.getSourceChannel());
                conn.setTargetChannel(c.getTargetChannel());
                conn.setStage(stage); // Maintain bidirectional relationship
                return conn;
            }).collect(Collectors.toList()));
        }

        return stage;
    }

    public StageDto toDto(Stage entity) {
        if (entity == null) return null;

        StageDto dto = new StageDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setWidthMeters(entity.getWidthMeters());
        dto.setDepthMeters(entity.getDepthMeters());

        if (entity.getElements() != null) {
            dto.setElements(entity.getElements().stream().map(e -> {
                StageElementDto elementDto = new StageElementDto();
                elementDto.setId(e.getId());
                elementDto.setLabel(e.getLabel());
                elementDto.setCategory(e.getCategory());
                elementDto.setX(e.getX());
                elementDto.setY(e.getY());
                elementDto.setWidth(e.getWidth());
                elementDto.setHeight(e.getHeight());

                if (e.getConfiguration() != null) {
                    elementDto.setConfiguration(new HashMap<>(e.getConfiguration()));
                }

                return elementDto;
            }).collect(Collectors.toList()));
        }

        if (entity.getConnections() != null) {
            dto.setConnections(entity.getConnections().stream().map(c -> {
                ConnectionDto connDto = new ConnectionDto();
                connDto.setId(c.getId());
                connDto.setSourceId(c.getSourceId());
                connDto.setTargetId(c.getTargetId());
                connDto.setType(c.getType());
                connDto.setHexColor(c.getHexColor());
                connDto.setSourceChannel(c.getSourceChannel());
                connDto.setTargetChannel(c.getTargetChannel());
                return connDto;
            }).collect(Collectors.toList()));
        }

        return dto;
    }
}