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
import cloudshiftIcon from "../client/public/cloudshift.png";

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
    <div>
      <div className="nav flex items-center justify-between text-xl w-screen py-3.5 px-[6%]">
        <div className="grid grid-cols-5 items-center justify-center w-60">
          <div className="mr-4">
            <a href="https://www.cloudshift.dev" target="_blank">
              <img
                className="object-scale-down h-10 w-10"
                src={cloudshiftIcon}
              />{" "}
            </a>
          </div>
          <div className="col-span-4 font-cabin">CloudShift</div>
        </div>

        <div>
          <a
            className="font-play"
            target="_blank"
            href="https://github.com/oslabs-beta/CloudShift/blob/main/README.md"
          >
            ReadMe
          </a>
        </div>
      </div>
      <div className="flex mt-3.5">
        <RemoteContainer></RemoteContainer>
        {isMigrating && <Overlay></Overlay>}
      </div>
    </div>
  );
};

export default App;
