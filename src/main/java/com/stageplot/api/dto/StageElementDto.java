package com.stageplot.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class StageElementDto {
    @NotBlank
    private String id;
    private String label;
    @NotBlank
    private String category;

    @NotNull
    private Double x;
    @NotNull
    private Double y;
    private double width;
    private double height;

    private Map<String, Object> configuration = new HashMap<>();
}