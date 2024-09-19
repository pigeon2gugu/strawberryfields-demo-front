import axios from '@/apis/axios';
import { TrackItem } from '@/typings/Track/track';
import { PagedData } from '@/typings/Service/Page';
import { TCommonResponse } from '@/typings/Service/API';
import { API_ENDPOINTS } from '@/constants/Endpoints';

export const getTracksApi = (page: number = 1, size: number = 10) => {
  return axios.get<TCommonResponse<PagedData<TrackItem>>>(API_ENDPOINTS.COMPOSER.GET_TRACKS, {
    params: { page: page - 1, size }
  });
};
