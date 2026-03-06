import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {polyfill} from "mobile-drag-drop";
import "mobile-drag-drop/default.css";


// Enable drag and drop on touch devices
polyfill({
    dragImageCenterOnTouch: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);