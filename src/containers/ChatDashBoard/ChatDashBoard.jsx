import { Box } from "@mui/material";
import React from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import usePersistData from "../../hooks/usePersistData";

export const ChatDashBoard = () => {
  const [usernameKey] = usePersistData("username");

  return (
    <Box height="100vh">
      <ConversationsProvider>
        <SideBar username={usernameKey} />
      </ConversationsProvider>
    </Box>
  );
};
