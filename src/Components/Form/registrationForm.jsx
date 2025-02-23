import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'; // Импортируйте SweetAlert2
import useRegistration from '../hook/userRegistration';
import { UserContext } from '../context/contextAuth';


const RegistrationForm = ({ closeModal }) => {

    const { registerUser, loading, error } = useRegistration(); // Используем хук
    const { setAuth } = React.useContext(UserContext); // Используем контекст
    const { handleSubmit, register, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        const res = await registerUser(data); // Используем функцию регистрации из хука

        if (res) {
            // Обрабатываем успешную регистрацию
            setAuth(true);
            localStorage.setItem('access_token', res.data.accessToken); //  Сохраняем access_token
            localStorage.setItem('refresh_token', res.data.refreshToken); //  Сохраняем refresh_token
            Swal.fire({
                title: "Успешно!",
                text: "Вы успешно зарегистрировались.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            closeModal();
        } else {
            // Обрабатываем ошибку
            Swal.fire({
                title: "Ошибка!",
                text: error?.response?.data?.message || "Произошла ошибка при регистрации.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'Email обязателен для заполнения',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Неверный формат email',
                        },
                    })}
                    className={errors.email ? 'form-control error' : 'form-control'}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'Пароль обязателен для заполнения',
                        minLength: {
                            value: 6,
                            message: 'Пароль должен содержать не менее 6 символов',
                        },
                    })}
                    className={errors.password ? 'form-control error' : 'form-control'}
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
        </form>
    );
};

export default RegistrationForm;