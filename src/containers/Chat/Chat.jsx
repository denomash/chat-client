import React, { useCallback, useState } from "react";
import { Box, Button, TextareaAutosize } from "@mui/material";

import { useConversations } from "../../contexts/ConversationsProvider";
import ChatStyles from "../../components/styles/ChatStyles";

const Chat = ({ username }) => {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);

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
    <ChatStyles>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Box flexGrow={1} overflow="auto">
          <Box
            display="flex"
            flexDirection="column"
            padding="0 16px 0 16px"
            justifyContent="end"
          >
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
                    style={{
                      padding: 6,
                      background: `${message.fromMe ? "#1976d2" : "#cbcbcb"}`,
                      borderRadius: 2,
                    }}
                    color={`${message.fromMe ? "#fff" : "#333"}`}
                  >
                    {message.text}
                  </Box>
                  <Box style={{ fontSize: 14, color: "gray" }}>
                    {message.fromMe ? "You" : message.sender}
                  </Box>
                </Box>
              );
            })}
          </Box>{" "}
        </Box>

        {/* New text message */}
        <Box display="flex">
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "88%",
              margin: "0 0 6px 6px",
              padding: 16,
              resize: "none",
            }}
          />
          <Button
            variant="contained"
            style={{
              margin: "0 6px 6px 6px",
              padding: 12,
              resize: "none",
            }}
            disabled={!text}
            onClick={() => onSend()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </ChatStyles>
  );
};

export default Chat;
