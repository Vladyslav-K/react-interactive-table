import React from "react";
import { shallow } from "enzyme";

import App from "../components/App";
import Square from "../components/Square";

describe("Render", () => {
  it("Component APP rendered", () => {
    const AppShallow = shallow(<App />);

    expect(AppShallow).toMatchSnapshot();
  });

  it("Component Square rendered", () => {
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );

    expect(SquareShallow).toMatchSnapshot();
  });
});

describe("Square", () => {
  it("Correct initial height", () => {
    const SquareShallow = shallow(<Square />);
    const AppShallow = shallow(<App />);
    const { initialHeight } = AppShallow.props();

    expect(SquareShallow.find('[data-test="row"]')).toHaveLength(initialHeight);
  });

  it("Correct initial width", () => {
    const SquareShallow = shallow(<Square />);
    const AppShallow = shallow(<App />);
    const { initialWidth, initialHeight } = AppShallow.props();

    expect(SquareShallow.find('[data-test="cell"]')).toHaveLength(
      initialWidth * initialHeight
    );
  });

  it("Clicking on the addRowButton creates a row", () => {
    const SquareShallow = shallow(<Square />);
    const AppShallow = shallow(<App />);
    const { initialHeight } = AppShallow.props();

    SquareShallow.find('[data-test="add-row-button"]').simulate("click");
    expect(SquareShallow.find('[data-test="row"]')).toHaveLength(
      initialHeight + 1
    );
  });

  it("Clicking on the addColumnButton creates a column", () => {
    const SquareShallow = shallow(<Square />);
    const AppShallow = shallow(<App />);
    const { initialWidth, initialHeight } = AppShallow.props();

    SquareShallow.find('[data-test="add-column-button"]').simulate("click");

    expect(SquareShallow.find('[data-test="cell"]')).toHaveLength(
      (initialWidth + 1) * initialHeight
    );
  });

  it("Clicking on the removeRowButton deletes a row", () => {
    const SquareShallow = shallow(<Square />);
    const AppShallow = shallow(<App />);
    const { initialHeight } = AppShallow.props();

    SquareShallow.find('[data-test="remove-row-button"]').simulate("click");

    expect(SquareShallow.find('[data-test="row"]')).toHaveLength(
      initialHeight - 1
    );
  });

  it("Clicking on the removeColumnButton deletes a column", () => {
    const SquareShallow = shallow(<Square />);
    const AppShallow = shallow(<App />);
    const { initialWidth, initialHeight } = AppShallow.props();

    SquareShallow.find('[data-test="remove-column-button"]').simulate("click");

    expect(SquareShallow.find('[data-test="cell"]')).toHaveLength(
      initialHeight * initialWidth - initialWidth
    );
  });

  it("removeRowButton does not delete row if last", () => {
    const OneCellSquare = shallow(
      <Square initialHeight={1} initialWidth={1} cellSize={50} />
    );

    OneCellSquare.find('[data-test="remove-row-button"]').simulate("click");

    expect(OneCellSquare.find('[data-test="row"]')).toHaveLength(1);
  });

  it("removeColumnButton does not delete column if last", () => {
    const OneCellSquare = shallow(
      <Square initialHeight={1} initialWidth={1} cellSize={50} />
    );

    OneCellSquare.find('[data-test="remove-column-button"]').simulate("click");

    expect(OneCellSquare.find('[data-test="cell"]')).toHaveLength(1);
  });
});
