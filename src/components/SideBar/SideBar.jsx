import { useState } from "react";
import { Box, Button, Tab, Typography, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Hooks
import { useConversations } from "../../contexts/ConversationsProvider";

// Styles
import { useStyles } from "./styles";

// Components
import NewConversationMadal from "../NewConversationMadal";

export const SideBar = ({ username }) => {
  const [value, setValue] = useState("1");
  const [chatBuddy, setChatBuddy] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [value1, setValue1] = useState(0);

  const classes = useStyles();

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => setModalOpen(false);

  const { conversations, createConversations, selectConversationIndex } =
    useConversations();

  const handleCreateConversation = () => {
    createConversations([{ username: chatBuddy }, { username }]);
    handleClose();
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box
        style={{ borderRight: "solid 2px", borderColor: "#1976d2" }}
        className={classes.root}
      >
        <Box sx={{ width: "100%", typography: "body1" }} flexGrow={1}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "ActiveBorder",
              }}
            >
              <TabList onChange={handleChange} aria-label="Chat">
                <Tab label="Conversations" value="1" style={{ width: 250 }} />
              </TabList>
            </Box>

            {/* List Conversations */}
            <TabPanel value="1" style={{ padding: 0 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                }}
              >
                <Tabs
                  orientation="vertical"
                  value={value1}
                  onChange={handleChange1}
                  aria-label="Conversations"
                  sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}
                >
                  {conversations.map((convo, i) => {
                    const names = convo.recipients.map(
                      (recipient) => recipient.username
                    );

                    const name = names.find((n) => n !== username);

                    return (
                      <Tab
                        key={i}
                        label={name}
                        {...a11yProps(i)}
                        onClick={() => selectConversationIndex(i)}
                      />
                    );
                  })}
                </Tabs>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>

        {/* Logged in user details */}
        <Box display="flex" flexDirection="column" padding={1}>
          <Box display="flex" alignItems="center">
            <Typography className={classes.userInfo}>Your username:</Typography>
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

      {/* New Conversation modal */}
      <NewConversationMadal
        chatBuddy={chatBuddy}
        modalOpen={modalOpen}
        handleClose={handleClose}
        setChatBuddy={setChatBuddy}
        handleCreateConversation={handleCreateConversation}
      />
    </>
  );
};
