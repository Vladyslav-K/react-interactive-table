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
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );
    const AppShallow = shallow(<App />);
    const { initialHeight } = AppShallow.props();

    expect(SquareShallow.find("#row")).toHaveLength(initialHeight);
  });

  it("Correct initial width", () => {
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );
    const AppShallow = shallow(<App />);
    const { initialWidth } = AppShallow.props();

    expect(
      SquareShallow.find("#row")
        .at(0)
        .find("#cell")
    ).toHaveLength(initialWidth);
  });

  it("Clicking on the addRowButton creates a row", () => {
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );
    const squareRows = SquareShallow.find("#row").length;

    SquareShallow.find("#add-row-button").simulate("click");
    expect(SquareShallow.find("#row")).toHaveLength(squareRows + 1);
  });

  it("Clicking on the addColumnButton creates a column", () => {
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );
    const squareColumns = SquareShallow.find("#row")
      .at(0)
      .find("#cell").length;

    SquareShallow.find("#add-column-button").simulate("click");

    expect(
      SquareShallow.find("#row")
        .at(0)
        .find("#cell")
    ).toHaveLength(squareColumns + 1);
  });

  it("Clicking on the removeRowButton deletes a row", () => {
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );
    const squareRows = SquareShallow.find("#row").length;

    SquareShallow.find("#remove-row-button").simulate("click");

    expect(SquareShallow.find("#row")).toHaveLength(squareRows - 1);
  });

  it("Clicking on the removeColumnButton deletes a column", () => {
    const SquareShallow = shallow(
      <Square initialHeight={4} initialWidth={4} cellSize={50} />
    );
    const squareColumns = SquareShallow.find("#row")
      .at(0)
      .find("#cell").length;

    SquareShallow.find("#remove-column-button").simulate("click");

    expect(
      SquareShallow.find("#row")
        .at(0)
        .find("#cell")
    ).toHaveLength(squareColumns - 1);
  });

  it("removeRowButton does not delete row if last", () => {
    const OneCellSquare = shallow(
      <Square initialHeight={1} initialWidth={1} cellSize={50} />
    );

    OneCellSquare.find("#remove-row-button").simulate("click");

    expect(OneCellSquare.find("#row")).toHaveLength(1);
  });

  it("removeColumnButton does not delete column if last", () => {
    const OneCellSquare = shallow(
      <Square initialHeight={1} initialWidth={1} cellSize={50} />
    );

    OneCellSquare.find("#remove-column-button").simulate("click");

    expect(
      OneCellSquare.find("#row")
        .at(0)
        .find("#cell")
    ).toHaveLength(1);
  });
});