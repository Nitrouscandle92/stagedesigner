package com.stageplot.core.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.HashMap;
import java.util.Map;

@Entity
@Data
public class StageElement {
    @Id
    private String id;

    private String label;
    private String category;

    private double x;
    private double y;
    private double width;
    private double height;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> configuration = new HashMap<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    private Stage stage;
}