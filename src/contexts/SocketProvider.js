import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const useSocket = () => useContext(SocketContext);

const ENDPOINT = "localhost:5000";

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
