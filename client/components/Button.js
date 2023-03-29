import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { migrationStatusChange } from '../slice.js';

const Button = (props) => {
  //Some Things to track in State...
  //isMigrating / loading status
  //From/To component input fields

  //Components to return
  //two remote components
  //button
  //overlay?
  //graphic/animation for loading status

  const dispatch = useDispatch();
  const changeMigrationStatus = () => {
    dispatch(migrationStatusChange(true));
  };

  return <button onClick={() => changeMigrationStatus()}>Start</button>;
};

export default Button;
