//As this is a simple non interactive component,
//testing is done to check basic component rendering
import React from "react";
import { shallow } from "enzyme";

import TextFieldGroup from "../../components/common/TextFieldGroup";

describe("<TextFieldGroup/>", () => {
  it("renders without crashing", () => {
    //Shallow isolates and only renders single component, not parent. So that we get pure unit testing
    const component = shallow(<TextFieldGroup />);

    //This function checks if the snapshot matches the rendered component
    expect(component).toMatchSnapshot();
  });
});
