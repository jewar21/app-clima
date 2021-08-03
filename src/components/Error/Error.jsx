import React from "react";
import "./Error.css";

const Error = ({ error, isOpen, closeModal, openModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <div>
      <article className={`modal ${isOpen && "is-open"}`}>
        <div
          className="modal-container-error"
          onClick={handleModalContainerClick}
        >
          {/* <button className="modal-close" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes}/>
          </button> */}
          <h2 className="warning">¡WARNING!</h2>
          <h3 className="error">{error}</h3>
          <button className="btn-modal-error"onClick={closeModal}>Aceptar</button>
        </div>
      </article>
    </div>
  );
};

export default Error;
