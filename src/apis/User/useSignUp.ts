import { useMutation, UseMutationResult } from '@tanstack/react-query';
import apiClient from '../axios';
import { API_ENDPOINTS } from '../../constants/Endpoints';
import { 
  SignUpRequest, 
  SignUpResponse
} from '../../typings/User/User';
import { TCommonResponse } from '../../typings/Service/API'

export const signUp = async (data: SignUpRequest): Promise<TCommonResponse<SignUpResponse>> => {
  const endpoint = 'artist' in data ? API_ENDPOINTS.USER.SIGNUP_COMPOSER : API_ENDPOINTS.USER.SIGNUP_AGENCY;
  const response = await apiClient.post<TCommonResponse<SignUpResponse>>(endpoint, data);
  return response.data;
};

export const useSignUp = () => {
  return useMutation<TCommonResponse<SignUpResponse>, Error, SignUpRequest>({
    mutationFn: signUp,
  });
};