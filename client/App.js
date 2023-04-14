import React, { useEffect } from "react";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import { RemoteContainer } from "./components/RemoteContainer";
import Overlay from "./components/Overlay";
import { socket } from "./socket";
import {
  updateDataTransferProgressPercent,
  updateSocketConnectivity,
} from "./slice";
//import styles if necessary
//may need to import functions from slices here

const App = () => {
  const dispatch = useDispatch();
  const { isMigrating } = useSelector((state) => state.GUI);

  //Basic client socket.io connection.
  //MAY NEED TO SHIFT THIS LOGIC INTO THE COMPONENT WE NEED?
  useEffect(() => {
    function onConnect() {
      dispatch(updateSocketConnectivity(true));
    }

    function onDisconnect() {
      dispatch(updateSocketConnectivity(false));
    }

    function onDataTransfer(value) {
      //Don't update value if it isn't a valid increase.
      if (value === "") return;
      dispatch(updateDataTransferProgressPercent(value));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("data transfer", onDataTransfer);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("data transfer", onDataTransfer);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-cyan-100 to-stone-200 !h-screen">
      <div className="nav flex items-center justify-between mr-36 ml-20 p-6 text-xl">
        <div>CloudShift</div>
        <div>
          <a
            target="_blank"
            href="https://github.com/oslabs-beta/CloudShift/blob/dev/README.md"
          >
            ReadMe
          </a>
        </div>
      </div>
      <RemoteContainer></RemoteContainer>
      {isMigrating && <Overlay></Overlay>}
    </div>
  );
};

export default App;
