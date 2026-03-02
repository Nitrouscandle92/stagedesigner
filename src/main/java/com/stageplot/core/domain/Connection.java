package com.stageplot.core.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sourceId;
    private String targetId;

    @Enumerated(EnumType.STRING)
    private ConnectionType type;

    private String hexColor;
    private Integer sourceChannel;
    private Integer targetChannel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    private Stage stage;
}