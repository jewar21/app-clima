import React from "react";
import "./Error.css"

const Error = ({ error, isOpen, closeModal, openModal }) => {
    const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <div>
      <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
        <div className="modal-container" onClick={handleModalContainerClick}>
          <button className="modal-close" onClick={closeModal}>
            X
          </button>
          <h3>{error}</h3>
        </div>
      </article>
    </div>
  );
};

export default Error;
