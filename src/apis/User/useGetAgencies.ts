import axios from '@/apis/axios';
import { AgencyItem } from '@/typings/User/User';
import { PagedData } from '@/typings/Service/Page';
import { TCommonResponse } from '@/typings/Service/API';
import { API_ENDPOINTS } from '@/constants/Endpoints';

export const getAgenciesApi = (page: number = 1, size: number = 10) => {
    return axios.get<TCommonResponse<PagedData<AgencyItem>>>(API_ENDPOINTS.USER.GET_AGENCIES, {
      params: { page : page - 1, size }
    });
  };