import axios from '@/apis/axios';
import { CreatePitchingRequest, CreatePitchingResponse } from '@/typings/Pitching/Pitching';
import { API_ENDPOINTS } from '@/constants/Endpoints';

export const createPitchingApi = (data: CreatePitchingRequest) => {
    return axios.post<CreatePitchingResponse>(API_ENDPOINTS.COMPOSER.CREATE_AND_GET_PITCHING, data);
  };
  