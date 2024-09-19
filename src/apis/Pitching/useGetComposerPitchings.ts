import axios from '@/apis/axios';
import { ComposerPitchingItem } from '@/typings/Pitching/Pitching';
import { PagedData } from '@/typings/Service/Page';
import { TCommonResponse } from '@/typings/Service/API';
import { API_ENDPOINTS } from '@/constants/Endpoints';

export const getPitchingsApi = (page: number = 1, size: number = 10) => {
    return axios.get<TCommonResponse<PagedData<ComposerPitchingItem>>>(API_ENDPOINTS.COMPOSER.CREATE_AND_GET_PITCHING, {
      params: { page: page - 1, size }
    });
  };