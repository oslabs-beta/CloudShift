import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoteContainer } from './components/RemoteContainer';
import Button from './components/Button';
import Overlay from './components/Overlay';
//import styles if necessary
//may need to import functions from slices here

const App = (props) => {
  return (
    <>
      <RemoteContainer></RemoteContainer>
      <Button></Button>
      <Overlay></Overlay>
    </>
  );
};

export default App;
