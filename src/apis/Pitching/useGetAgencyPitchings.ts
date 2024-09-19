import axios from '@/apis/axios';
import { AgencyPitchingItem } from '@/typings/Pitching/Pitching';
import { PagedData } from '@/typings/Service/Page';
import { TCommonResponse } from '@/typings/Service/API';
import { API_ENDPOINTS } from '@/constants/Endpoints';

export const getAgencyPitchingsApi = (page: number = 1, size: number = 10) => {
    return axios.get<TCommonResponse<PagedData<AgencyPitchingItem>>>(API_ENDPOINTS.AGENCY.GET_PITCHINGS, {
      params: { page: page - 1, size }
    });
  };