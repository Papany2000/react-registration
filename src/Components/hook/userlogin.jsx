import { useState } from 'react';
import { login } from '../Api/apiUser';


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const res = await login(data);
            console.log(res)
            setLoading(false);
            return res; // Возвращаем ответ в случае успеха
        } catch (err) {
            setLoading(false);
            setError(err);
            return null; // Возвращаем null в случае ошибки
        }
    };

    return { loginUser, loading, error };
};

export default useLogin;