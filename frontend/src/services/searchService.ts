import axios from 'axios';

export const searchCats = (params: any): Promise<any> => {
    return axios.post('http://localhost:5000/search', { params: params }).then((response) => response.data);
};

export const getFeatures = (feature: string): Promise<any> => {
    return axios.post('http://localhost:5000/getFeatureData', {feature: feature}).then((response) => response.data);
}

export const getAll = (): Promise<any> => {
    return axios.get('http://localhost:5000/getAll').then((response) => response.data);
};