package com.stageplot.core.logic;

import com.stageplot.core.domain.StageElement;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SafetyService {

    private static final double MIN_DISTANCE_METERS = 0.5;

    public boolean hasSafetyViolation(StageElement newElement, List<StageElement> existingElements) {
        return existingElements.stream().anyMatch(existing -> checkCollision(newElement, existing));
    }

    private boolean checkCollision(StageElement a, StageElement b) {
        return a.getX() < b.getX() + b.getWidth() + MIN_DISTANCE_METERS &&
                a.getX() + a.getWidth() + MIN_DISTANCE_METERS > b.getX() &&
                a.getY() < b.getY() + b.getHeight() + MIN_DISTANCE_METERS &&
                a.getY() + a.getHeight() + MIN_DISTANCE_METERS > b.getY();
    }
}