import React, { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";

import { useConversations } from "../../contexts/ConversationsProvider";
import { useStyles } from "./styles";

const Chat = ({ username }) => {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);

  const classes = useStyles();

  const onSend = () => {
    const names = selectedConversation.recipients.map(
      (recipient) => recipient.username
    );

    const recipient = names.find((name) => name !== username);

    console.log(username, names, selectedConversation, recipient, { text });
    sendMessage(recipient, names, text);
    setText("");
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.messagesContainer}>
        <Box className={classes.messages}>
          {selectedConversation.messages.map((message, i) => {
            const isLastMessage =
              selectedConversation.messages.length - 1 === i;
            return (
              <Box
                key={i}
                display="flex"
                flexDirection="column"
                alignItems={`${message.fromMe ? "end" : "start"}`}
                padding={1}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <Box
                  className={classes.message}
                  style={{
                    color: `${message.fromMe ? "#fff" : "#333"}`,
                    background: `${message.fromMe ? "#1976d2" : "#cbcbcb"}`,
                    borderRadius: `${message.fromMe ? '10px 0 10px 10px' : "0 10px 10px 10px"}`
                  }}
                >
                  {message.text}
                </Box>
                <Box className={classes.sender}>
                  {message.fromMe ? "You" : message.sender}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* New text message */}
      <Box display="flex">
        <textarea
          data-testid="chat-input"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={classes.textArea}
        />
        <Button
          variant="contained"
          className={classes.button}
          disabled={!text}
          onClick={() => onSend()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
