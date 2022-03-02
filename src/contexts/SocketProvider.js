import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const useSocket = () => useContext(SocketContext);

const ENDPOINT = process.env.REACT_APP_URL;

const SocketProvider = ({ username, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ["websocket"],
      query: { id: username },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
