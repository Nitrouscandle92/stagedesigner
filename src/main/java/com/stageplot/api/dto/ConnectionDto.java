package com.stageplot.api.dto;

import com.stageplot.core.domain.ConnectionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ConnectionDto {
    private Long id;

    @NotBlank
    private String sourceId;
    @NotBlank
    private String targetId;

    @NotNull
    private ConnectionType type;

    private String hexColor;
    private Integer sourceChannel;
    private Integer targetChannel;
}