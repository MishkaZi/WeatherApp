import React from 'react';
import './ErrorMessage.css';

const Message = (error: any) => {
  return (
    <div style={{ color: 'red' }}>
      {error.error.message} ({error.error.request.statusText})
    </div>
  );
};

export default Message;
