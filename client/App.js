import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoteContainer } from './components/RemoteContainer';
import MigrationButton from './components/MigrationButton';
import Overlay from './components/Overlay';
//import styles if necessary
//may need to import functions from slices here

const App = (props) => {
  const {isMigrating, origin, destination} = useSelector(state => state.GUI)
  return (
    <>
      <RemoteContainer></RemoteContainer>
      { origin.accessId && origin.secretKey && destination.accessId && destination.secretKey && (origin.accountId || destination.accountId) && <MigrationButton></MigrationButton>}
      { isMigrating && <Overlay></Overlay>}
    </>
  );
};

export default App;
