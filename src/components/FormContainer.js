import "./FormContainer.css";
import React from "react";

const FormContainer = ({ children, onSubmit, title }) => {
  return (
    <div className="form-container">
      <h2 className="form-container__title">{title}</h2>
      <form className="form-container__form" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default FormContainer;
