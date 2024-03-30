import api from '../Utils/ApiClient';
import { useMockTestStore } from './MockTestStore';

export const getQuestion = async () => {
  const response = await api.get('/question');
  return response.data;
};
