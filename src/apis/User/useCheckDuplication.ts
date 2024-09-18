import { useMutation } from '@tanstack/react-query';
import apiClient from '../axios';
import { API_ENDPOINTS } from '@/constants/Endpoints';
import { DuplicationCheckRequest, DuplicationCheckResponse } from '@/typings/User/User'
import { TCommonResponse } from '@/typings/Service/API'

export const checkDuplication = async (data: DuplicationCheckRequest): Promise<TCommonResponse<DuplicationCheckResponse>> => {
  let endpoint: string;
  switch (data.type) {
    case 'email':
      endpoint = API_ENDPOINTS.USER.EMAIL_EXISTS;
      break;
    case 'artist':
      endpoint = API_ENDPOINTS.USER.ARTIST_EXISTS;
      break;
    case 'company':
      endpoint = API_ENDPOINTS.USER.COMPANY_EXISTS;
      break;
    default:
      throw new Error('Invalid duplication check type');
  }
  
  const response = await apiClient.get<TCommonResponse<DuplicationCheckResponse>>(endpoint, { params: { [data.type]: data.value } });
  return response.data;
};

export const useCheckDuplication = () => {
  return useMutation({
    mutationFn: (data: DuplicationCheckRequest) => checkDuplication(data),
  });
};