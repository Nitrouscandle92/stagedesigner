import React, { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, useReactFlow, Position } from '@xyflow/react';

const CableEdge = ({
                       id,
                       source, // WICHTIG: Wir holen uns jetzt die IDs der verknüpften Nodes
                       target,
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
    const { setEdges, getZoom, getNode } = useReactFlow();
    const [isHovered, setIsHovered] = useState(false);

    const cableColor = style.stroke || '#9ca3af';
    const fanOffset = data?.offset || 0;

    // --- NEU: Rotations-Intelligenz ---
    // Wir holen uns die tatsächlichen Nodes aus dem Canvas
    const sourceNode = getNode(source);
    const targetNode = getNode(target);

    // Wir lesen deren Rotation aus (Standard ist 0)
    const sourceRot = sourceNode?.data?.configuration?.rotation || 0;
    const targetRot = targetNode?.data?.configuration?.rotation || 0;

    // Diese Funktion berechnet die ECHTE Himmelsrichtung des Anschlusses nach der Drehung
    const getEffectivePosition = (pos, rotation) => {
        // Normalisiert die Rotation auf 0 bis 359 Grad (auch bei negativen Werten)
        const normalize = (deg) => ((deg % 360) + 360) % 360;
        const rot = normalize(rotation);

        const posMap = {
            [Position.Right]: 0,
            [Position.Bottom]: 90,
            [Position.Left]: 180,
            [Position.Top]: 270
        };
        const angleMap = {
            0: Position.Right,
            90: Position.Bottom,
            180: Position.Left,
            270: Position.Top
        };

        const currentAngle = posMap[pos];
        if (currentAngle === undefined) return pos;

        // Neuen Winkel berechnen und auf das 90-Grad-Raster einrasten
        const newAngle = normalize(currentAngle + rot);
        const snappedAngle = Math.round(newAngle / 90) * 90 % 360;

        return angleMap[snappedAngle] || pos;
    };

    // Wir überschreiben die logischen Positionen mit den echten, rotiertern Positionen
    const effSourcePos = getEffectivePosition(sourcePosition, sourceRot);
    const effTargetPos = getEffectivePosition(targetPosition, targetRot);
    // -----------------------------------

    // 1. Sicheren Abstand berechnen (jetzt mit der echten effSourcePos!)
    const getOffsetPos = (pos, x, y, offset = 25) => {
        if (pos === Position.Top) return { x, y: y - offset };
        if (pos === Position.Bottom) return { x, y: y + offset };
        if (pos === Position.Left) return { x: x - offset, y };
        if (pos === Position.Right) return { x: x + offset, y };
        return { x, y };
    };

    const p1 = getOffsetPos(effSourcePos, sourceX, sourceY);
    const p2 = getOffsetPos(effTargetPos, targetX, targetY);

    // 2. Ausrichtungen analysieren
    const isSourceH = effSourcePos === Position.Left || effSourcePos === Position.Right;
    const isTargetH = effTargetPos === Position.Left || effTargetPos === Position.Right;

    // 3. Rückwärts-Erkennung
    let isBackwards = false;
    if (effSourcePos === Position.Top && p2.y > p1.y) isBackwards = true;
    if (effSourcePos === Position.Bottom && p2.y < p1.y) isBackwards = true;
    if (effSourcePos === Position.Left && p2.x > p1.x) isBackwards = true;
    if (effSourcePos === Position.Right && p2.x < p1.x) isBackwards = true;

    // 4. Wegpunkte berechnen
    let defaultWpX = p1.x + (p2.x - p1.x) / 2;
    let defaultWpY = p1.y + (p2.y - p1.y) / 2;

    if (isSourceH && isTargetH) {
        defaultWpX += fanOffset;
        defaultWpY += fanOffset;
    }

    if (isBackwards) {
        const CLEARANCE = 150; // Großer Bogen für Instrumente wie E-Piano
        if (!isSourceH) {
            defaultWpX = p1.x + CLEARANCE;
        } else {
            defaultWpY = p1.y + CLEARANCE;
        }
    }

    const wp = data?.wp || { x: defaultWpX, y: defaultWpY };

    // 5. Pfad generieren
    let path = `M ${sourceX} ${sourceY} L ${p1.x} ${p1.y}`;
    let labelX = wp.x;
    let labelY = wp.y;

    if (!isSourceH && !isTargetH) {
        if (isBackwards) {
            path += ` L ${wp.x} ${p1.y} L ${wp.x} ${p2.y}`;
            labelX = wp.x;
            labelY = p1.y + (p2.y - p1.y) / 2;
        } else {
            path += ` L ${p1.x} ${wp.y} L ${p2.x} ${wp.y}`;
            labelX = p1.x + (p2.x - p1.x) / 2;
            labelY = wp.y;
        }
    }
    else if (isSourceH && isTargetH) {
        if (isBackwards) {
            path += ` L ${p1.x} ${wp.y} L ${p2.x} ${wp.y}`;
            labelX = p1.x + (p2.x - p1.x) / 2;
            labelY = wp.y;
        } else {
            path += ` L ${wp.x} ${p1.y} L ${wp.x} ${p2.y}`;
            labelX = wp.x;
            labelY = p1.y + (p2.y - p1.y) / 2;
        }
    }
    else if (!isSourceH && isTargetH) {
        if (isBackwards) {
            path += ` L ${wp.x} ${p1.y} L ${wp.x} ${p2.y}`;
            labelX = wp.x;
            labelY = p2.y;
        } else {
            path += ` L ${p1.x} ${wp.y} L ${wp.x} ${wp.y} L ${wp.x} ${p2.y}`;
        }
    }
    else {
        if (isBackwards) {
            path += ` L ${p1.x} ${wp.y} L ${p2.x} ${wp.y}`;
            labelX = p2.x;
            labelY = wp.y;
        } else {
            path += ` L ${wp.x} ${p1.y} L ${wp.x} ${wp.y} L ${p2.x} ${wp.y}`;
        }
    }

    path += ` L ${p2.x} ${p2.y} L ${targetX} ${targetY}`;

    // 6. Drag & Drop Logik
    const onMouseDown = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        const startX = evt.clientX;
        const startY = evt.clientY;
        const startWpX = wp.x;
        const startWpY = wp.y;

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
                            wp: { x: startWpX + deltaX, y: startWpY + deltaY }
                        }
                    };
                }
                return e;
            }));
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                markerEnd={markerEnd}
                style={{ ...style, strokeWidth: 2, stroke: cableColor }}
            />

            <path
                d={path}
                fill="none"
                stroke="transparent"
                strokeWidth={25}
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
                        zIndex: 9999,
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