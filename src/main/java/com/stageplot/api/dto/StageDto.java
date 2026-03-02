package com.stageplot.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class StageDto {
    private Long id;

    @NotBlank
    private String name;

    @Positive
    private double widthMeters;

    @Positive
    private double depthMeters;

    @Valid
    private List<StageElementDto> elements = new ArrayList<>();

    @Valid
    private List<ConnectionDto> connections = new ArrayList<>();
}