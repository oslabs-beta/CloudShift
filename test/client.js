import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import App from "../src/client/App";
import store from "../src/client/store";

describe("Unit testing React components", () => {
  describe("Renders necessary components.", () => {
    test("Should render Navbar & Origin/Destination components on initial load.", () => {
      const app = renderer
        .create(
          <Provider store={store}>
            <App />
          </Provider>
        )
        .toJSON();
      expect(app).toMatchSnapshot();
    });
  });
});
