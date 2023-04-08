import React from 'react';
import { useSelector } from 'react-redux';

const ErrorComponent = () => {
  const { errorMessage } = useSelector((state) => state.GUI);
  const { message } = errorMessage;

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
