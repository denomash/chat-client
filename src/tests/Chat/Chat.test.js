import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Chat from "../../containers/Chat/Chat";
import { ConversationsContext } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const mock = {
  selectedConversation: {
    messages: [],
  },
  sendMessage: (recipient, names, text) => {},
};

const Container = () => (
  <SocketProvider username="test">
    <ConversationsContext.Provider value={mock}>
      <Chat username="test" />
    </ConversationsContext.Provider>
  </SocketProvider>
);

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render a disabled send button", () => {
  render(<Container />);
  const sendButton = screen.getByRole("button", {
    name: /send/i,
  });
  expect(sendButton).toBeDisabled();
});

it("should render a enabled send button after type", () => {
  render(<Container />);
  const inputEl = screen.getByTestId("chat-input");
  expect(inputEl).toBeInTheDocument();

  fireEvent.change(inputEl, {target: {value: 'test'}})


  const sendButton = screen.getByRole("button", {
    name: /send/i,
  });
  expect(sendButton).toBeEnabled();
});
