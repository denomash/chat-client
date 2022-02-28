import { useState } from "react";
import { Box, Button, Tab, Typography, Modal, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useConversations } from "../../contexts/ConversationsProvider";

export const SideBar = ({ username }) => {
  const [value, setValue] = useState("1");
  const [chatBuddy, setChatBuddy] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (event, newValue) => {
    console.log({ newValue }, event.target.value);
    setValue(newValue);
  };

  const handleClose = () => setModalOpen(false);

  const { createConversations } = useConversations();

  const handleCreateConversation = () => {
    console.log("<<<< CREATE CONVO >>>>", chatBuddy);
    createConversations({ username: chatBuddy });
    handleClose();
  };

  const { conversations } = useConversations();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box
        width={250}
        height="100%"
        style={{ borderRight: "solid 2px", borderColor: "gray" }}
      >
        <Box sx={{ width: "100%", height: "90%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "ActiveBorder",
              }}
            >
              <TabList onChange={handleChange} aria-label="Chat">
                <Tab label="Conversations" value="1" style={{ width: 250 }} />
                {/* <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" /> */}
              </TabList>
            </Box>
            <TabPanel value="1">
              {conversations.map((convo, i) => (
                <div>{convo.recepient.username}</div>
              ))}
            </TabPanel>
            {/* <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel> */}
          </TabContext>
        </Box>

        <Box display="flex" flexDirection="column" padding={1}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">Your username:</Typography>
            <Typography marginLeft={1} color="grey">
              {username}
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: 10, width: "100%", borderRadius: 0 }}
            onClick={() => setModalOpen(true)}
          >
            New Conversation
          </Button>
        </Box>
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter username of the user you wish to chat
          </Typography>
          <TextField
            id="filled-basic"
            label="Chat buddy"
            variant="filled"
            required
            style={{ width: "100%", marginTop: 20 }}
            value={chatBuddy}
            onChange={(e) => setChatBuddy(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: 10 }}
            onClick={handleCreateConversation}
          >
            start Conversation
          </Button>
        </Box>
      </Modal>
    </>
  );
};
