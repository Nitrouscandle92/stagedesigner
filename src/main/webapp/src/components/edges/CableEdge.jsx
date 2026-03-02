import React, { useCallback, useState } from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';

const CableEdge = ({
                       id,
                       sourceX,
                       sourceY,
                       targetX,
                       targetY,
                       sourcePosition,
                       targetPosition,
                       style = {},
                       markerEnd,
                       data
                   }) => {
    const { setEdges, getZoom } = useReactFlow();

    const [isHovered, setIsHovered] = useState(false);

    // Die manuellen Offsets (oder der Standard-Fächer-Wert aus StageCanvas)
    const manualOffsetX = data?.manualOffsetX ?? data?.offset ?? 0;
    const manualOffsetY = data?.manualOffsetY ?? data?.offset ?? 0;

    const cableColor = style.stroke || '#9ca3af';

    // Berechne die Standard-Mitte
    const defaultCenterX = sourceX + (targetX - sourceX) / 2;
    const defaultCenterY = sourceY + (targetY - sourceY) / 2;

    const [path, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 0,
        centerX: defaultCenterX + manualOffsetX,
        centerY: defaultCenterY + manualOffsetY,
    });

    const onMouseDown = useCallback((evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        const startX = evt.clientX;
        const startY = evt.clientY;
        const startOffsetX = manualOffsetX;
        const startOffsetY = manualOffsetY;

        const onMouseMove = (moveEvt) => {
            const zoom = getZoom();
            const deltaX = (moveEvt.clientX - startX) / zoom;
            const deltaY = (moveEvt.clientY - startY) / zoom;

            setEdges((eds) => eds.map((e) => {
                if (e.id === id) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            manualOffsetX: startOffsetX + deltaX,
                            manualOffsetY: startOffsetY + deltaY
                        }
                    };
                }
                return e;
            }));
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            setIsHovered(false); // Hover-Status zurücksetzen

            // GUMMIBAND-EFFEKT: Kabel springt nach dem Loslassen auf den Ursprung zurück
            setEdges((eds) => eds.map((e) => {
                if (e.id === id) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            // Wir überschreiben die manuellen Werte wieder mit dem berechneten Ursprung
                            manualOffsetX: e.data.offset || 0,
                            manualOffsetY: e.data.offset || 0
                        }
                    };
                }
                return e;
            }));
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [id, manualOffsetX, manualOffsetY, setEdges, getZoom]);

    return (
        <>
            {/* Das sichtbare Kabel */}
            <BaseEdge
                id={id}
                path={path}
                markerEnd={markerEnd}
                style={{ ...style, strokeWidth: 2, stroke: cableColor }}
            />

            {/* Unsichtbarer, dicker Hit-Pfad für das Hover-Event */}
            <path
                d={path}
                fill="none"
                stroke="transparent"
                strokeWidth={20}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer' }}
            />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: 'all',
                        zIndex: 100,
                    }}
                    className="nodrag nopan"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        onMouseDown={onMouseDown}
                        className={`w-6 h-6 cursor-grab active:cursor-grabbing flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default CableEdge;