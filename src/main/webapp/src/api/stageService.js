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
    try {
        const response = await apiClient.get(`/stages/${id}/export`, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Patchlist_${id}.pdf`);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        throw error;
    }
};