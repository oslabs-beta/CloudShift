import React, { useReducer } from 'react';
import Remote from './components/Remote';
import Button from './components/Button';
import Overlay from './components/Overlay';
//import styles if necessary

const initalState = {
  isMigrating: false,
  origin: { name: '', accessId: '', secretKey: '' },
  destination: {
    name: '',
    secretKey: '',
    accessId: '',
    accountId: '',
  },

  //     AWS: Access ID, Secret Key, and "Service" aka S3

  // 12:27
  // CF: Access Id, Secret Key, and Account ID
};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: state.length,
          name: action.name,
        },
      ];
    default:
      return state;
  }
}

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
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
