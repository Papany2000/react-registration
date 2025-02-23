import axios from "axios";
import { axiosClient } from "../utils/axiosClient";
import { defaultAxiosOptions } from "../utils/config";

// Регистрация пользователя
export const postUser = async (user) => {
  return axiosClient.post(`/auth/signin`, user);
};

// Логин пользователя
export const login = async (data) => {
  return await axios.post('/auth/login', data, defaultAxiosOptions);
};

// Обновление токена
export const refreshToken = async (refreshToken) => {
  return axiosClient.post(`/auth/refresh`, { refreshToken }); // Убедитесь, что бэкенд ожидает refreshToken в объекте { refreshToken: string }
};

// Получение информации о пользователе (требует accessToken)
export const getUserInfo = async () => {
  return axiosClient.get(`/auth/me`); // Предполагается, что /auth/me возвращает информацию о пользователе
};

// Выход из системы (logout) - удаление refreshToken на сервере
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('Токен не найден');
    }
    await axiosClient.post('/auth/logout', { refreshToken });
    // Очистка данных
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Перенаправление после успеха
    window.location.href = '/registration';
  } catch (error) {
    console.error('Ошибка:', error.response?.data?.message || error.message);
    // Можно показать уведомление пользователю
    alert('Не удалось выйти. Попробуйте ещё раз.');
  }
};
