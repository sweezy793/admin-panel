//As this is a simple non interactive component,
//testing is done to check basic component rendering
import React from "react";
import { shallow } from "enzyme";

import Footer from "../../components/layout/Footer";

describe("<Footer/>", () => {
  it("renders without crashing", () => {
    //Shallow isolates and only renders single component, not parent. So that we get pure unit testing
    const component = shallow(<Footer />);

    //This function checks if the snapshot matches the rendered component
    expect(component).toMatchSnapshot();
  });
});
