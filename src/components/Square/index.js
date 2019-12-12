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
      key: 0
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

  render() {
    const { cellSize } = this.props;
    const { square } = this.state;

    return (
      <Container className="container">
        <SquareContainer className="square-container">
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
          <RemoveRowButton className="remove-row-button" cellSize={cellSize}>
            -
          </RemoveRowButton>
          <RemoveColumnButton classname="remove-col-button" cellSize={cellSize}>
            -
          </RemoveColumnButton>
        </SquareContainer>
        <AddRowButton
          className="arr-row-button"
          cellSize={cellSize}
          onClick={this.createRow}
        >
          +
        </AddRowButton>
        <AddColumnButton
          className="arr-column-button"
          cellSize={cellSize}
          onClick={this.createColumn}
        >
          +
        </AddColumnButton>
      </Container>
    );
  }
}
