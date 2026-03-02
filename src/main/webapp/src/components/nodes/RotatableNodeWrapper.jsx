import React, { useRef, useState, useEffect } from 'react';
import { useReactFlow, useUpdateNodeInternals } from '@xyflow/react';
import { RotateCw } from 'lucide-react';

const RotatableNodeWrapper = ({ id, selected, rotation, children }) => {
    const { updateNodeData } = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    const nodeRef = useRef(null);
    const [isRotating, setIsRotating] = useState(false);

    const onPointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRotating(true);
    };

    useEffect(() => {
        if (!isRotating) return;

        const onPointerMove = (e) => {
            if (!nodeRef.current) return;
            const rect = nodeRef.current.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            angle += 90;
            if (angle < 0) angle += 360;

            const snappedAngle = Math.round(angle / 15) * 15;

            updateNodeData(id, {
                configuration: { rotation: snappedAngle }
            });

            updateNodeInternals(id);
        };

        const onPointerUp = () => {
            setIsRotating(false);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [isRotating, id, updateNodeData, updateNodeInternals]);

    useEffect(() => {
        updateNodeInternals(id);
    }, [rotation, id, updateNodeInternals]);

    return (
        <div ref={nodeRef} className="relative w-full h-full">
            {selected && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-50">
                    <div
                        className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400"
                        onPointerDown={onPointerDown}
                        style={{ cursor: isRotating ? 'grabbing' : 'grab' }}
                    >
                        <RotateCw size={12} color="white" />
                    </div>
                    <div className="w-px h-4 bg-blue-500 border-l border-dashed border-blue-300"></div>
                </div>
            )}

            <div style={{ transform: `rotate(${rotation || 0}deg)`, transformOrigin: 'center center' }}>
                {children}
            </div>
        </div>
    );
};

export default RotatableNodeWrapper;