import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Remote from './components/Remote';
import Button from './components/Button';
import Overlay from './components/Overlay';
//import styles if necessary
//may need to import functions from slices here

const App = (props) => {
  //if state.origin access credentials are null then destination componenet should be greyed out ?
  //should destination componenet only be rendered when origin access creds are in state ?
  const { render } = useSelector((state) => state.GUI.destination);
  return (
    <>
      <Remote provider={'Origin'}></Remote>
      <div>
        {render ? <Remote provider={'Destination'}></Remote> : <h1>Hi</h1>}
      </div>

      <Button></Button>
      <Overlay></Overlay>
    </>
  );
};

export default App;
