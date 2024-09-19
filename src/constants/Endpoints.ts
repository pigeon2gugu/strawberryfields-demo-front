const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REFRESH: `${BASE_URL}/auth/refresh`
  },
  USER: {
    SIGNUP_COMPOSER: `${BASE_URL}/user/composer`,
    SIGNUP_AGENCY: `${BASE_URL}/user/agency`,
    EMAIL_EXISTS: `${BASE_URL}/user/email-exists`,
    ARTIST_EXISTS: `${BASE_URL}/user/artist-exists`,
    COMPANY_EXISTS: `${BASE_URL}/user/company-exists`,
  },
  COMPOSER: {
    GET_TRACKS: `${BASE_URL}/composer/track`,
    UPLOAD_TRACK: `${BASE_URL}/composer/track/upload`
  }
};