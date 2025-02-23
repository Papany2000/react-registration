import React, { useState } from 'react';
import Modal from '../ui/model';
import RegistrationForm from '../Form/registrationForm';
import { logout } from '../Api/apiUser';
import LoginForm from '../Form/loginForm';


function Admin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', children: null });

    const openModal = (title, children) => {
        setModalContent({ title, children });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className={'divbutton'}>
                <button onClick={() => openModal("Введите свои данные", <RegistrationForm closeModal={closeModal} />)}>регистрация пользователя</button>
                <button onClick={logout}>Выход</button>
                <button onClick={() => openModal("Введите свои данные", <LoginForm closeModal={closeModal} />)}>Вход на сайт</button>
            </div>    
            <h2>Форма регистрации пользователя</h2>
            <Modal isOpen={isModalOpen}
                title={modalContent.title}
                onClose={closeModal}>
                {modalContent.children} {/* Рендерим children внутри Modal */}
            </Modal>
        </div>
    );
};
export default Admin;