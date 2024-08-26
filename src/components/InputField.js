import { useState } from 'react';

import '../styles/InputField.css'

const InputField = ({ label, value, onChange, type, className, onKeyDown }) => {

  const [validationError, setValidationError] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    try {
      JSON.parse(inputValue);
      setValidationError(null);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setValidationError(error.message);
      } else {
        setValidationError('Erro de validação JSON');
      }
    }

    onChange(inputValue);
  };
  return (
    <label className={`input-field ${className || ''}`}>
      {label}:
      {type === 'textarea' ? (
        <div>
          <textarea
            className={`input-textarea ${validationError ? 'invalid-json' : ''}`}
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
          />
          {validationError && <p className="error-message">{validationError}</p>}
        </div>
      ) : (
        <input
          className="input-text"
          type={type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
};

export default InputField;
