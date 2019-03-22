//These types of components have functionalities
//So a mock store is used for testing async redux actions and middleware
import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

import Landing from "../../components/layout/Landing";

describe("<Landing/>", () => {
  it("renders without crashing", () => {
    const component = shallow(
      //Provider makes mock store available to the nested component
      <Provider store={store}>
        <Landing />
      </Provider>
    );

    //This function checks if the snapshot matches the rendered component
    expect(component).toMatchSnapshot();
  });
});
