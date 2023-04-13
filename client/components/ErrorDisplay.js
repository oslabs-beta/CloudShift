import React from 'react';
import { useSelector } from 'react-redux';

const ErrorDisplay = () => {
  const { origin, destination } = useSelector((state) => state.GUI);
  const errorMessage = origin.errorMessage || destination.errorMessage;
  const { message } = errorMessage;

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
