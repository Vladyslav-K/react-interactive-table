import React from "react";
import {
  Wrapper,
  Container,
  Table,
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
      removeRowButtonDisplay: true,
      removeColumnButtonDisplay: true,
      removeRowButtonTop: 0,
      removeColumnButtonLeft: 0
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

  movingButtons = ({ target }) => {
    let {
      currentRowIndex,
      currentCellIndex,
      removeColumnButtonLeft,
      removeRowButtonTop
    } = this.state;

    if (target.tagName === "TD") {
      removeColumnButtonLeft = target.offsetLeft;
      removeRowButtonTop = target.offsetTop;
      currentCellIndex = target.cellIndex;
      currentRowIndex = target.parentNode.rowIndex;
    }

    this.setState({
      currentRowIndex,
      currentCellIndex,
      removeColumnButtonLeft,
      removeRowButtonTop
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

  deleteColumn = () => {
    let { square, currentCellIndex, removeColumnButtonLeft } = this.state;
    let { cellSize } = this.props;

    const columns = square[0].columns.length;
    const lastCellIndex = columns - 1;

    if (columns > 1) {
      square.map(row => row.columns.splice(currentCellIndex, 1));
    }

    if (currentCellIndex === lastCellIndex) {
      /* In this formula "2" - the padding of each cell, for the correct movement
      of the button should be considered when calculating */

      removeColumnButtonLeft =
        cellSize * (currentCellIndex - 1) + 2 * currentCellIndex;

      currentCellIndex--;
    }

    if (lastCellIndex <= 1) {
      this.setState({
        removeColumnButtonDisplay: false
      });
    }

    this.setState({
      square,
      removeColumnButtonLeft,
      currentCellIndex
    });
  };

  deleteRow = () => {
    let { square, currentRowIndex, removeRowButtonTop } = this.state;
    let { cellSize } = this.props;

    const rows = square.length;
    const lastRowIndex = rows - 1;

    if (rows > 1) {
      square.splice(currentRowIndex, 1);

      if (currentRowIndex === lastRowIndex) {
        /* In this formula "2" - the padding of each cell, for the correct movement
      of the button should be considered when calculating */
        removeRowButtonTop =
          cellSize * (currentRowIndex - 1) + 2 * currentRowIndex;
        currentRowIndex--;
      }

      if (lastRowIndex <= 1) {
        this.setState({
          removeRowButtonDisplay: false
        });
      }

      this.setState({
        square,
        removeRowButtonTop,
        currentRowIndex
      });
    }
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
    const {
      square,
      buttonsVisible,
      removeRowButtonDisplay,
      removeColumnButtonDisplay,
      removeRowButtonTop,
      removeColumnButtonLeft,
      currentRowIndex,
      currentCellIndex
    } = this.state;

    return (
      <Wrapper>
        <Container
          className="container"
          cellSize={cellSize}
          onMouseOver={this.movingButtons}
        >
          <div
            className="square-container"
            onMouseEnter={this.showButtons}
            onMouseLeave={this.hideButtons}
          >
            <Table>
              <tbody>
                {square.map(row => (
                  <tr key={`row-${row.key}`} className="row">
                    {row.columns.map(cell => (
                      <Cell
                        key={`cell-${cell.key}`}
                        cellSize={cellSize}
                        className="cell"
                        currentRowIndex={currentRowIndex}
                        currentCellIndex={currentCellIndex}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            <RemoveRowButton
              className="remove-row-button"
              onClick={this.deleteRow}
              cellSize={cellSize}
              buttonsVisible={buttonsVisible}
              removeRowButtonDisplay={removeRowButtonDisplay}
              removeRowButtonTop={removeRowButtonTop}
            >
              -
            </RemoveRowButton>
            <RemoveColumnButton
              classname="remove-column-button"
              onClick={this.deleteColumn}
              cellSize={cellSize}
              buttonsVisible={buttonsVisible}
              removeColumnButtonDisplay={removeColumnButtonDisplay}
              removeColumnButtonLeft={removeColumnButtonLeft}
            >
              -
            </RemoveColumnButton>
          </div>
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
      </Wrapper>
    );
  }
}
