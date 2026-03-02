import React from 'react';
import StageEditor from './components/editor/StageEditor';

function App() {
    return (
        <div className="w-full h-screen bg-stage-dark text-white overflow-hidden">
            <StageEditor />
        </div>
    );
}

export default App;