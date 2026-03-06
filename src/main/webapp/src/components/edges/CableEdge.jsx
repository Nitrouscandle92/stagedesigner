import React, { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, useReactFlow, Position } from '@xyflow/react';

const CableEdge = ({
                       id,
                       source,
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

    const sourceNode = getNode(source);
    const targetNode = getNode(target);

    const sourceRot = sourceNode?.data?.configuration?.rotation || 0;
    const targetRot = targetNode?.data?.configuration?.rotation || 0;

    const getEffectivePosition = (pos, rotation) => {
        const normalize = (deg) => ((deg % 360) + 360) % 360;
        const rot = normalize(rotation);

        const posMap = { [Position.Right]: 0, [Position.Bottom]: 90, [Position.Left]: 180, [Position.Top]: 270 };
        const angleMap = { 0: Position.Right, 90: Position.Bottom, 180: Position.Left, 270: Position.Top };

        const currentAngle = posMap[pos];
        if (currentAngle === undefined) return pos;

        const newAngle = normalize(currentAngle + rot);
        const snappedAngle = Math.round(newAngle / 90) * 90 % 360;

        return angleMap[snappedAngle] || pos;
    };

    const effSourcePos = getEffectivePosition(sourcePosition, sourceRot);
    const effTargetPos = getEffectivePosition(targetPosition, targetRot);

    // Increased initial offset to clear the node handles better
    const getOffsetPos = (pos, x, y, offset = 35) => {
        if (pos === Position.Top) return { x, y: y - offset };
        if (pos === Position.Bottom) return { x, y: y + offset };
        if (pos === Position.Left) return { x: x - offset, y };
        if (pos === Position.Right) return { x: x + offset, y };
        return { x, y };
    };

    const p1 = getOffsetPos(effSourcePos, sourceX, sourceY);
    const p2 = getOffsetPos(effTargetPos, targetX, targetY);

    const isSourceH = effSourcePos === Position.Left || effSourcePos === Position.Right;
    const isTargetH = effTargetPos === Position.Left || effTargetPos === Position.Right;

    // Detect if the line needs to wrap backwards around the source or target
    let sBackwards = false;
    if (effSourcePos === Position.Top && p2.y >= p1.y - 10) sBackwards = true;
    if (effSourcePos === Position.Bottom && p2.y <= p1.y + 10) sBackwards = true;
    if (effSourcePos === Position.Left && p2.x >= p1.x - 10) sBackwards = true;
    if (effSourcePos === Position.Right && p2.x <= p1.x + 10) sBackwards = true;

    let tBackwards = false;
    if (effTargetPos === Position.Top && p1.y >= p2.y - 10) tBackwards = true;
    if (effTargetPos === Position.Bottom && p1.y <= p2.y + 10) tBackwards = true;
    if (effTargetPos === Position.Left && p1.x >= p2.x - 10) tBackwards = true;
    if (effTargetPos === Position.Right && p1.x <= p2.x + 10) tBackwards = true;

    // Calculate node bounding boxes to route around them
    const sBox = sourceNode ? {
        left: sourceNode.position.x,
        right: sourceNode.position.x + (sourceNode.measured?.width || 80),
        top: sourceNode.position.y,
        bottom: sourceNode.position.y + (sourceNode.measured?.height || 80)
    } : { left: p1.x, right: p1.x, top: p1.y, bottom: p1.y };

    const tBox = targetNode ? {
        left: targetNode.position.x,
        right: targetNode.position.x + (targetNode.measured?.width || 80),
        top: targetNode.position.y,
        bottom: targetNode.position.y + (targetNode.measured?.height || 80)
    } : { left: p2.x, right: p2.x, top: p2.y, bottom: p2.y };

    let defaultWpX = p1.x + (p2.x - p1.x) / 2;
    let defaultWpY = p1.y + (p2.y - p1.y) / 2;

    const AVOID_PADDING = 40;

    // Force waypoint outside the source bounding box if wrapping around
    if (sBackwards) {
        if (isSourceH) {
            defaultWpY = p1.y < (sBox.top + sBox.bottom) / 2 ? sBox.top - AVOID_PADDING : sBox.bottom + AVOID_PADDING;
        } else {
            defaultWpX = p1.x < (sBox.left + sBox.right) / 2 ? sBox.left - AVOID_PADDING : sBox.right + AVOID_PADDING;
        }
    }

    // Force waypoint outside the target bounding box if arriving from behind
    if (tBackwards) {
        if (isTargetH) {
            const tSafeY = p2.y < (tBox.top + tBox.bottom) / 2 ? tBox.top - AVOID_PADDING : tBox.bottom + AVOID_PADDING;
            if (!sBackwards || isSourceH) defaultWpY = tSafeY;
        } else {
            const tSafeX = p2.x < (tBox.left + tBox.right) / 2 ? tBox.left - AVOID_PADDING : tBox.right + AVOID_PADDING;
            if (!sBackwards || !isSourceH) defaultWpX = tSafeX;
        }
    }

    const wp = data?.wp || { x: defaultWpX, y: defaultWpY };
    const hasCustomWp = !!data?.wp;

    let path = `M ${sourceX} ${sourceY} L ${p1.x} ${p1.y}`;
    let labelX = wp.x;
    let labelY = wp.y;

    // Draw simple L-shapes if no wrap-around is needed, otherwise use smart 5-segment avoidance
    if (!sBackwards && !tBackwards && !hasCustomWp) {
        if (!isSourceH && !isTargetH) {
            path += ` L ${p1.x} ${wp.y} L ${p2.x} ${wp.y}`;
        } else if (isSourceH && isTargetH) {
            path += ` L ${wp.x} ${p1.y} L ${wp.x} ${p2.y}`;
        } else if (!isSourceH && isTargetH) {
            path += ` L ${p1.x} ${p2.y}`;
            labelX = p1.x;
            labelY = p2.y;
        } else {
            path += ` L ${p2.x} ${p1.y}`;
            labelX = p2.x;
            labelY = p1.y;
        }
    } else {
        if (isSourceH) {
            path += ` L ${p1.x} ${wp.y} L ${wp.x} ${wp.y}`;
        } else {
            path += ` L ${wp.x} ${p1.y} L ${wp.x} ${wp.y}`;
        }

        if (isTargetH) {
            path += ` L ${wp.x} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
            path += ` L ${p2.x} ${wp.y} L ${p2.x} ${p2.y}`;
        }
    }

    path += ` L ${p2.x} ${p2.y} L ${targetX} ${targetY}`;

    const onMouseDown = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;

        const startX = clientX;
        const startY = clientY;
        const startWpX = wp.x;
        const startWpY = wp.y;

        const onMouseMove = (moveEvt) => {
            const moveClientX = moveEvt.touches ? moveEvt.touches[0].clientX : moveEvt.clientX;
            const moveClientY = moveEvt.touches ? moveEvt.touches[0].clientY : moveEvt.clientY;

            const zoom = getZoom();
            const deltaX = (moveClientX - startX) / zoom;
            const deltaY = (moveClientY - startY) / zoom;

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
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onMouseMove, { passive: false });
        document.addEventListener('touchend', onMouseUp);
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    className="nodrag nopan"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        onMouseDown={onMouseDown}
                        onTouchStart={onMouseDown}
                        className={`w-6 h-6 cursor-grab active:cursor-grabbing flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    </div>

                    <button
                        className={`w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-500 shadow-md transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setEdges((eds) => eds.filter((edge) => edge.id !== id));
                        }}
                        title="Remove Cable"
                    >
                        ✕
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default CableEdge;