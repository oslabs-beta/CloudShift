import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoteContainer } from './components/RemoteContainer';
import MigrationButton from './components/MigrationButton';
import Overlay from './components/Overlay';
import { socket } from './socket';
//import styles if necessary
//may need to import functions from slices here

const App = (props) => {
  const { isMigrating, origin, destination } = useSelector(
    (state) => state.GUI
  );

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  //Basic client socket.io connection.
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <>
      <div className="nav flex items-center justify-between mr-36 ml-20 p-6 text-xl ">
        <div>CloudShift</div>
        <div>
          <a href="#">Github</a>
        </div>
      </div>
      <RemoteContainer></RemoteContainer>
      {origin.selectedBucket && destination.selectedBucket && (
        <MigrationButton></MigrationButton>
      )}
      {isMigrating && <Overlay></Overlay>}
    </>
  );
};

export default App;
