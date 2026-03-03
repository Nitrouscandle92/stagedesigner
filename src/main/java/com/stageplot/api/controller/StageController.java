package com.stageplot.api.controller;

import com.stageplot.api.dto.StageDto;
import com.stageplot.api.mapper.StageMapper;
import com.stageplot.core.domain.Stage;
import com.stageplot.core.export.PdfExportService;
import com.stageplot.core.logic.CableColorService;
import com.stageplot.core.repository.StageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
    private final PdfExportService pdfService;
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
        // Clear existing elements/connections if updating to avoid duplicate key or mapping errors
        if (stageDto.getId() != null && repository.existsById(stageDto.getId())) {
            Stage existing = repository.findById(stageDto.getId()).get();
            existing.getElements().clear();
            existing.getConnections().clear();
            repository.saveAndFlush(existing);
        }

        Stage stage = mapper.toEntity(stageDto);

        for (int i = 0; i < stage.getConnections().size(); i++) {
            var conn = stage.getConnections().get(i);
            conn.setHexColor(colorService.getNextColor(conn.getType(), i));
        }

        Stage savedStage = repository.save(stage);
        return ResponseEntity.ok(mapper.toDto(savedStage));
    }

    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> exportPdf(@PathVariable Long id) {
        Stage stage = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stage not found"));

        byte[] pdf = pdfService.generatePdf(stage);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"stageplot_" + id + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}