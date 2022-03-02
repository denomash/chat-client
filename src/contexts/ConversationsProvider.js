import React, { useCallback, useContext, useEffect, useState } from "react";
import usePersistData from "../hooks/usePersistData";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

const useConversations = () => {
  return useContext(ConversationsContext);
};

const ConversationsProvider = ({ username, children }) => {
  const [conversations, setConversations] = usePersistData("conversations", []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const socket = useSocket();

  const createConversations = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({ recipient, recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let convoExists = false;
        let newMessage = { text, sender };
        const newConversations = prevConversations.map((conversation) => {
          const recievers = conversation.recipients.map(
            (recipient) => recipient.username
          );

          if (recievers.includes(recipient)) {
            convoExists = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        // Check if conversation exists
        // If exists update
        // Otherwise update existing conversations with the new one
        if (convoExists) {
          return newConversations;
        } else {
          // This mostly happens on the new tab we are starting a new conversation with
          return [
            ...prevConversations,
            { recipients, recipient, messages: [newMessage] },
          ];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation, conversations]);

  const sendMessage = (recipient, recipients, text) => {
    socket.emit("send-message", { recipient, recipients, text });
    addMessageToConversation({ recipients, recipient, text, sender: username });
  };

  const convos = conversations.map((convo, i) => {
    const messages = convo.messages.map((message) => {
      const fromMe = username === message.sender;
      return { ...message, fromMe };
    });

    return {
      ...convo,
      messages,
    };
  });

  return (
    <ConversationsContext.Provider
      value={{
        conversations: convos,
        createConversations,
        selectedConversation: convos[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export { useConversations, ConversationsProvider };
