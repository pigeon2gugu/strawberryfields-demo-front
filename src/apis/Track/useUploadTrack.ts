import axios from '@/apis/axios';
import { UploadTrackResponse } from '@/typings/Track/track';
import { TCommonResponse } from '@/typings/Service/API';
import { API_ENDPOINTS } from '@/constants/Endpoints';

export const uploadTrackApi = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post<TCommonResponse<UploadTrackResponse>>(API_ENDPOINTS.COMPOSER.UPLOAD_TRACK, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};