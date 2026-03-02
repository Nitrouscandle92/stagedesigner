import apiClient from './apiClient';

export const saveStage = async (stageData) => {
    const response = await apiClient.post('/stages', stageData);
    return response.data;
};

export const getStage = async (id) => {
    const response = await apiClient.get(`/stages/${id}`);
    return response.data;
};

export const exportStagePdf = async (id) => {
    // Requesting Blob format for file download
    const response = await apiClient.get(`/stages/${id}/export`, {
        responseType: 'blob'
    });
    return response.data;
};