import React, { useContext } from "react";
import usePersistData from "../hooks/usePersistData";

const ConversationsContext = React.createContext();

const useConversations = () => {
  return useContext(ConversationsContext);
};

const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = usePersistData("conversations", []);

  const createConversations = (recepient) => {
    console.log("<<<< CREATE CONVO CONTEXT >>>>", recepient, conversations);
    
    setConversations((prevConversations) => {
      return [...prevConversations, { recepient, messages: [] }];
    });
  };

  // console.log("<<<< CONVERSATIONS >>>>", conversations);


  // const formattedConversations = conversations.map((conversation, index) => {
  //   const recipients = conversation.recipients.map(recipient => {
  //     // const contact = contacts.find(contact => {
  //     //   return contact.id === recipient
  //     // })
  //     // const name = (contact && contact.name) || recipient
  //     return { id: recipient, name }
  //   })
  // })

  return (
    <ConversationsContext.Provider
      value={{ conversations, createConversations }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export { useConversations, ConversationsProvider };
