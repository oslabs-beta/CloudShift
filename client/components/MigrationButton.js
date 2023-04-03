import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { migrationStatusChange } from '../slice.js';

const StartMigrationButton = (props) => {
  const dispatch = useDispatch();
  const changeMigrationStatus = () => {
    dispatch(migrationStatusChange(true));
  };

  return (
    <button onClick={() => changeMigrationStatus()}>Start Migration</button>
  );
};

export default StartMigrationButton;
