import React from "react";
import {
  Container,
  SquareContainer,
  Row,
  Cell,
  AddRowButton,
  AddColumnButton,
  RemoveRowButton,
  RemoveColumnButton
} from "../Styled";

export default class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      square: [],
      key: 0,
      currentCellIndex: 0,
      currentRowIndex: 0,
      buttonsVisible: false,
      buttonsDisplay: true
    };
  }

  componentDidMount() {
    this.createSquare();
  }

  createSquare = () => {
    let { square, key } = this.state;
    let { initialHeight, initialWidth } = this.props;

    for (let rows = 0; rows < initialHeight; rows++) {
      let columns = [];

      for (let cells = 0; cells < initialWidth; cells++) {
        columns[cells] = {
          key: key++
        };
      }
      square[rows] = {
        key: key++,
        columns: columns
      };
    }

    this.setState({
      square,
      key
    });
  };

  createColumn = () => {
    let { square, key } = this.state;

    square.map(row => row.columns.push({ key: key++ }));

    this.setState({
      square,
      key
    });
  };

  createRow = () => {
    let { square, key } = this.state;

    let columns = [];
    for (let cells = 0; cells < square[0].columns.length; cells++) {
      columns.push({
        key: key++
      });
    }

    square.push({
      key: key++,
      columns: columns
    });

    this.setState({
      square,
      key
    });
  };

  showButtons = () => {
    let { square, buttonsVisible } = this.state;
    if (square.length > 1) {
      buttonsVisible = true;
    }

    if (square[0].columns.length > 1) {
      buttonsVisible = true;
    }

    this.setState({
      buttonsVisible: buttonsVisible
    });
  };

  hideButtons = () => {
    let { buttonsVisible } = this.state;
    buttonsVisible = false;

    this.setState({
      buttonsVisible: buttonsVisible
    });
  };

  render() {
    const { cellSize } = this.props;
    const { square, buttonsVisible, buttonsDisplay } = this.state;

    return (
      <Container className="container" cellSize={cellSize}>
        <SquareContainer
          className="square-container"
          onMouseEnter={this.showButtons}
          onMouseLeave={this.hideButtons}
        >
          {square.map(row => (
            <Row key={`row-${row.key}`} className="row">
              {row.columns.map(cell => (
                <Cell
                  key={`cell-${cell.key}`}
                  cellSize={cellSize}
                  className="cell"
                />
              ))}
            </Row>
          ))}
          <RemoveRowButton
            className="remove-row-button"
            cellSize={cellSize}
            buttonsVisible={buttonsVisible}
            buttonsDisplay={buttonsDisplay}
          >
            -
          </RemoveRowButton>
          <RemoveColumnButton
            classname="remove-column-button"
            cellSize={cellSize}
            buttonsVisible={buttonsVisible}
            buttonsDisplay={buttonsDisplay}
          >
            -
          </RemoveColumnButton>
        </SquareContainer>
        <AddRowButton
          className="add-row-button"
          cellSize={cellSize}
          onClick={this.createRow}
        >
          +
        </AddRowButton>
        <AddColumnButton
          className="add-column-button"
          cellSize={cellSize}
          onClick={this.createColumn}
        >
          +
        </AddColumnButton>
      </Container>
    );
  }
}
