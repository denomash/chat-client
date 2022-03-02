import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

// Hooks
import { SideBar } from "../../components/SideBar/SideBar";
import { SocketProvider } from "../../contexts/SocketProvider";

// Components
import {
  ConversationsProvider,
  useConversations,
} from "../../contexts/ConversationsProvider";
import Chat from "../Chat/Chat";

const Container = ({ id }) => {
  const { selectedConversation } = useConversations();

  return (
    <>
      <SideBar username={id} />
      {selectedConversation && <Chat username={id} />}
    </>
  );
};

export const DashBoard = () => {
  const history = useLocation();

  const { id } = queryString.parse(history.search);

  return (
    <Box height="100vh" display="flex">
      <SocketProvider username={id}>
        <ConversationsProvider username={id}>
          <Container id={id} />
        </ConversationsProvider>
      </SocketProvider>
    </Box>
  );
};
