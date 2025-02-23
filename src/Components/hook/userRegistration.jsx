import { useState } from 'react';
import { postUser } from '../Api/apiUser';


const useRegistration = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postUser(data);
            setLoading(false);
            return res; // Возвращаем ответ в случае успеха
        } catch (err) {
            setLoading(false);
            setError(err);
            return null; // Возвращаем null в случае ошибки
        }
    };

    return { registerUser, loading, error };
};

export default useRegistration;