import api from '../Utils/ApiClient';

export const getQuestion = async (testId: string, endpoint: string) => {
  const response = await api.get('/question/'+ testId + '/' + endpoint);
  return response.data;
};
