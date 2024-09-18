import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '@/typings/Auth/Auth';
import { TCommonResponse } from '@/typings/Service/API';
import { API_ENDPOINTS } from '@/constants/Endpoints';
import apiClient, { setAccessToken } from '../axios';

const login = async (data: LoginRequest): Promise<TCommonResponse<LoginResponse>> => {
  const endpoint = API_ENDPOINTS.AUTH.LOGIN;
  const response = await apiClient.post<TCommonResponse<LoginResponse>>(endpoint, data);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
      localStorage.setItem('refreshToken', data.data.refreshToken);
    },
  });
};
