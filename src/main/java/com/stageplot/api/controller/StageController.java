package com.stageplot.api.controller;

import com.stageplot.api.dto.StageDto;
import com.stageplot.api.mapper.StageMapper;
import com.stageplot.core.domain.Connection;
import com.stageplot.core.domain.Stage;
import com.stageplot.core.domain.StageElement;
import com.stageplot.core.logic.CableColorService;
import com.stageplot.core.repository.StageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StageController {

    private final StageRepository repository;
    private final CableColorService colorService;
    private final StageMapper mapper;

    @GetMapping
    public ResponseEntity<List<StageDto>> getAllStages() {
        List<StageDto> stages = repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(stages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StageDto> getStage(@PathVariable Long id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<StageDto> saveStage(@Valid @RequestBody StageDto stageDto) {
        Stage stageToSave;

        if (stageDto.getId() != null && repository.existsById(stageDto.getId())) {
            stageToSave = repository.findById(stageDto.getId()).orElseThrow();

            stageToSave.setName(stageDto.getName());
            stageToSave.setWidthMeters(stageDto.getWidthMeters());
            stageToSave.setDepthMeters(stageDto.getDepthMeters());

            if (stageDto.getElements() != null) {
                stageToSave.getElements().removeIf(existing ->
                        stageDto.getElements().stream().noneMatch(dto -> dto.getId().equals(existing.getId()))
                );

                for (var dto : stageDto.getElements()) {
                    var existingOpt = stageToSave.getElements().stream()
                            .filter(e -> e.getId().equals(dto.getId()))
                            .findFirst();

                    if (existingOpt.isPresent()) {
                        var existing = existingOpt.get();
                        existing.setCategory(dto.getCategory());
                        existing.setConfiguration(dto.getConfiguration());
                        existing.setLabel(dto.getLabel());
                        existing.setX(dto.getX());
                        existing.setY(dto.getY());
                        existing.setWidth(dto.getWidth());
                        existing.setHeight(dto.getHeight());
                    } else {
                        StageElement newElement = new StageElement();
                        newElement.setId(dto.getId());
                        newElement.setCategory(dto.getCategory());
                        newElement.setConfiguration(dto.getConfiguration());
                        newElement.setLabel(dto.getLabel());
                        newElement.setX(dto.getX());
                        newElement.setY(dto.getY());
                        newElement.setWidth(dto.getWidth());
                        newElement.setHeight(dto.getHeight());
                        newElement.setStage(stageToSave);
                        stageToSave.getElements().add(newElement);
                    }
                }
            } else {
                stageToSave.getElements().clear();
            }

            stageToSave.getConnections().clear();
            if (stageDto.getConnections() != null) {
                int i = 0;
                for (var dto : stageDto.getConnections()) {
                    Connection conn = new Connection();
                    conn.setSourceId(dto.getSourceId());
                    conn.setTargetId(dto.getTargetId());
                    conn.setType(dto.getType() != null ? dto.getType() : com.stageplot.core.domain.ConnectionType.AUDIO);
                    conn.setHexColor(colorService.getNextColor(conn.getType(), i++));
                    conn.setStage(stageToSave);
                    stageToSave.getConnections().add(conn);
                }
            }

            Stage saved = repository.save(stageToSave);
            return ResponseEntity.ok(mapper.toDto(saved));

        } else {
            stageToSave = mapper.toEntity(stageDto);
            if (stageToSave.getElements() != null) {
                stageToSave.getElements().forEach(e -> e.setStage(stageToSave));
            }
            if (stageToSave.getConnections() != null) {
                int i = 0;
                for (var c : stageToSave.getConnections()) {
                    c.setStage(stageToSave);
                    c.setHexColor(colorService.getNextColor(c.getType(), i++));
                }
            }
            Stage savedStage = repository.save(stageToSave);
            return ResponseEntity.ok(mapper.toDto(savedStage));
        }
    }
}