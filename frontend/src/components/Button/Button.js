import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({
  onClick, children, type = 'button', disabled = false, style, className, testId = '', id = '',
}) {
  return (
    <button id={id} data-testid={testId} disabled={disabled} className={className || 'custom-button'} type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  style: PropTypes.object, // Allow users to pass a custom style object
};

export default Button;
