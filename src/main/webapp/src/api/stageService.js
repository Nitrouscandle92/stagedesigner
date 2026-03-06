import apiClient from './apiClient';

export const saveStage = async (stageData) => {
    const response = await apiClient.post('/stages', stageData);
    return response.data;
};

export const getStage = async (id) => {
    const response = await apiClient.get(`/stages/${id}`);
    return response.data;
};

export const getAllStages = async () => {
    const response = await apiClient.get('/stages');
    return response.data;
};

export const getStageById = async (id) => {
    const response = await apiClient.get(`/stages/${id}`);
    return response.data;
};