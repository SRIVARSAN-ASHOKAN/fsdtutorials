import React from 'react';

function Toast({ msg, type }) {
  return (
    <div className={`toast ${type}`}>
      {type === 'success' && '✓ '}
      {type === 'error'   && '⚠ '}
      {type === 'info'    && 'ℹ '}
      {msg}
    </div>
  );
}

export default Toast;
