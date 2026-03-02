import { useCallback } from 'react';

export const useScaling = () => {
    const PIXELS_PER_METER = 250;

    const toPixels = useCallback((meters) => {
        return meters * PIXELS_PER_METER;
    }, []);

    const toMeters = useCallback((pixels) => {
        return pixels / PIXELS_PER_METER;
    }, []);

    return { toPixels, toMeters };
};