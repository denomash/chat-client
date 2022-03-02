import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import { SideBar } from "../../components/SideBar/SideBar";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const Container = () => (
  <SocketProvider username="test">
    <ConversationsProvider username="test">
      <SideBar username="test" />
    </ConversationsProvider>
  </SocketProvider>
);

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders username", () => {
  render(<Container />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

test("has a new conersation button", () => {
  render(<Container />);
  const button = screen.getByText(/new conversation/i);
  expect(button).toBeTruthy();
});

test("modal opens on click", () => {
  render(<Container />);
  fireEvent.click(screen.getByText(/new conversation/i));

  const button = screen.getByText(
    /Enter username of the user you wish to chat/i
  );
  expect(button).toBeTruthy();
});

it("should render a disabled start conversation button", () => {
  render(<Container />);
  fireEvent.click(screen.getByText(/new conversation/i));

  const starConversationButton = screen.getByRole("button", {
    name: /start conversation/i,
  });
  expect(starConversationButton).toBeDisabled();
});

it("should render a enabled start conversation button after type", () => {
  render(<Container />);

  fireEvent.click(screen.getByText(/new conversation/i));

  const starConversationButton = screen.getByRole("button", {
    name: /start conversation/i,
  });

  const inputEl = screen.getByTestId("start-conversation-input");

  expect(inputEl).toBeInTheDocument();

  fireEvent.change(inputEl, { target: { value: "test" } });

  expect(starConversationButton).toBeEnabled();
});
