import axios from "axios";
import { defaultAxiosOptions } from "./config";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


export const axiosClient = axios.create(defaultAxiosOptions);

// 1. Middleware для автоматического обновления токена
axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          // Токен истек, пытаемся обновить
          console.log('Access token истек, обновляем...');
          // Получаем refresh token (предполагается, что он тоже сохранен)
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            // Нет refresh token, значит нужно залогиниться снова
            console.log('Нет refresh token, нужно залогиниться снова');
            if (!refreshToken) {
              const navigate = useNavigate();
              navigate("/registration", { replace: true });
            }
            return config; // Или выбросить ошибку
          }

          try {
            const response = await axios.post('/auth/refresh', { refreshToken }); //  Эндпоинт для обновления токена

            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken); // Сохраняем новый токен

            config.headers.Authorization = `Bearer ${newAccessToken}`; //  Заменяем токен в заголовке
          } catch (refreshError) {
            // Ошибка при обновлении токена
            console.error('Ошибка при обновлении токена:', refreshError);
            if (refreshError) {
              const navigate = useNavigate();
              navigate("/registration", { replace: true });
            }
            return config; // Или выбросить ошибку
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`; // Добавляем  существующий токен в header
        }
      } catch (decodeError) {
        console.error('Ошибка при декодировании токена:', decodeError);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor для добавления токена в защищённый запрос запрос
axiosClient.interceptors.request.use(
  (config) => {
    //  Исключаем эндпоинты регистрации и логина
    if (config.url !== '/auth/signin' && config.url !== '/auth/login') { 
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


