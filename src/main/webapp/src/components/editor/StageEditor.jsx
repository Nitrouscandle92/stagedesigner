import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import Sidebar from '../sidebar/Sidebar';
import StageCanvas from './StageCanvas';

const StageEditor = () => {
    return (
        <div className="flex h-full w-full">
            <ReactFlowProvider>
                <Sidebar />
                <StageCanvas />
            </ReactFlowProvider>
        </div>
    );
};

export default StageEditor;