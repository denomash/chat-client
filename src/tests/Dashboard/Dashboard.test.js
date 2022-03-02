import { Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";

import { DashBoard } from "../../containers/DashBoard/DashBoard";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const Container = () => {
  const history = createMemoryHistory();

  return (
    <Router history={history}>
      <SocketProvider username="test">
        <ConversationsProvider username="test">
          <DashBoard username="test" />
        </ConversationsProvider>
      </SocketProvider>
    </Router>
  );
};

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});
