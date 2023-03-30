import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Origin from './components/Origin';
import Destination from './components/Destination';
import Button from './components/Button';
import Overlay from './components/Overlay';
//import styles if necessary
//may need to import functions from slices here

const App = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);
  return (
    <>
      <Origin
        name={origin.name}
        service={origin.service}
      ></Origin>
      <div>
        {destination.render && (
          <Destination
            name={destination.name}
            service={destination.service}
          ></Destination>
        )}
      </div>

      <Button></Button>
      <Overlay></Overlay>
    </>
  );
};

export default App;



