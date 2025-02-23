import React from "react";


const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) {
    return null; // Ничего не рендерим, если модальное окно закрыто
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <div>{children}</div> {/* Рендерим children здесь */}
      </div>
    </div>
  );
};

export default Modal;
