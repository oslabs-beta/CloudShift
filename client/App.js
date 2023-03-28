import React from 'react';
import Remote from './components/Remote';
import Button from './components/Button';
import Overlay from './components/Overlay';
//import styles if necessary

const App = (props) => {
  //Some Things to track in State...
  //isMigrating / loading status
  //From/To component input fields

  //Components to return
  //two remote components
  //button
  //overlay?
  //graphic/animation for loading status
  return (
    <>
      <Remote></Remote>
      <Button></Button>
      <Overlay></Overlay>
    </>
  );
};

export default App;
