import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  user-select: none;
`;

const Container = styled.div`
  position: absolute;
  user-select: none;
`;

const Table = styled.table`
  border: 1px solid #48aae6;
  cursor: grab;
  user-select: none;
`;

const Cell = styled.td`
  height: ${({ cellSize }) => cellSize}px;
  min-width: ${({ cellSize }) => cellSize}px;
  min-height: ${({ cellSize }) => cellSize}px;

  padding: 0;

  background-color: #48aae6;

  user-select: none;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  height: ${({ cellSize }) => cellSize}px;
  width: ${({ cellSize }) => cellSize}px;
  margin: 2px;

  color: #ffffff;

  font-size: ${({ cellSize }) => cellSize / 2}px;
  font-weight: bold;
  text-align: center;

  opacity: 1;

  transition-duration: 0.6s;
  cursor: pointer;

  user-select: none;

  &:hover {
    opacity: 0.8;
    transition-duration: 0.5s;
  }
`;

const AddButtons = styled(Button)`
  background-color: #f3a500;
`;

const RemoveButtons = styled(Button)`
  visibility: hidden;
  opacity: 0;

  background-color: #b20000;
`;

const AddRowButton = styled(AddButtons)`
  top: 100%;
  left: 1px;
`;

const AddColumnButton = styled(AddButtons)`
  top: 1px;
  left: 100%;
`;

const RemoveRowButton = styled(RemoveButtons)`
  visibility: ${({ buttonsVisible }) =>
    buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${({ buttonsVisible }) => (buttonsVisible === true ? 1 : 0)};

  top: ${({ cellSize, currentRowIndex }) =>
    cellSize * currentRowIndex + 2 * currentRowIndex}px;
  right: 100%;
  margin: 3px 2px;
`;

const RemoveColumnButton = styled(RemoveButtons)`
  visibility: ${({ buttonsVisible }) =>
    buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${({ buttonsVisible }) => (buttonsVisible === true ? 1 : 0)};

  bottom: 100%;
  left: ${({ cellSize, currentCellIndex }) =>
    cellSize * currentCellIndex + 2 * currentCellIndex}px;
  margin: 2px 3px;
`;

export default class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],

      currentCellIndex: 0,
      currentRowIndex: 0,

      buttonsVisible: false,
      removeRowButtonDisplay: true,
      removeColumnButtonDisplay: true
    };

    this.containerRef = React.createRef();

    this.uniqueKey = 0;

    this.offsetX = 0;
    this.offsetY = 0;
  }

  componentDidMount() {
    this.createSquare();
    document.addEventListener("mouseup", this.onDragEnd);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onDragEnd);
    document.removeEventListener("mousemove", this.onDragging);
  }

  createSquare = () => {
    const newRows = [];
    const newColumns = [];

    const { initialHeight, initialWidth } = this.props;

    for (let cells = 0; cells < initialWidth; cells++) {
      newColumns[cells] = this.uniqueKey++;
    }

    for (let rows = 0; rows < initialHeight; rows++) {
      newRows[rows] = this.uniqueKey++;
    }

    this.setState({
      rows: newRows,
      columns: newColumns
    });
  };

  onDragStart = ({ clientX, clientY }) => {
    document.addEventListener("mousemove", this.onDragging);

    this.offsetX =
      clientX - this.containerRef.current.getBoundingClientRect().left;
    this.offsetY =
      clientY - this.containerRef.current.getBoundingClientRect().top;
  };

  onDragging = ({ pageX, pageY }) => {
    this.containerRef.current.style.left = pageX - this.offsetX + "px";
    this.containerRef.current.style.top = pageY - this.offsetY + "px";
  };

  onDragEnd = () => {
    document.removeEventListener("mousemove", this.onDragging);
  };

  movingButtons = ({ target }) => {
    if (target.tagName === "TD") {
      this.setState({
        currentCellIndex: target.cellIndex,
        currentRowIndex: target.parentNode.rowIndex
      });
    }
  };

  createColumn = () => {
    const { columns } = this.state;

    this.setState({
      columns: columns.concat(this.uniqueKey++)
    });
  };

  createRow = () => {
    const { rows } = this.state;

    this.setState({
      rows: rows.concat(this.uniqueKey++)
    });
  };

  deleteColumn = () => {
    const { currentCellIndex, columns } = this.state;
    const lastCellIndex = columns.length - 1;

    this.setState(prevState => ({
      removeColumnButtonDisplay: lastCellIndex > 1,

      columns:
        columns.length > 1
          ? prevState.columns.filter((cell, idx) => idx !== currentCellIndex)
          : prevState.columns,

      currentCellIndex:
        currentCellIndex === lastCellIndex
          ? prevState.currentCellIndex - 1
          : prevState.currentCellIndex
    }));
  };

  deleteRow = () => {
    const { currentRowIndex, rows } = this.state;
    const lastRowIndex = rows.length - 1;

    this.setState(prevState => ({
      removeRowButtonDisplay: lastRowIndex > 1,

      rows:
        rows.length > 1
          ? prevState.rows.filter((row, idx) => idx !== currentRowIndex)
          : prevState.rows,

      currentRowIndex:
        currentRowIndex === lastRowIndex
          ? prevState.currentRowIndex - 1
          : prevState.currentRowIndex
    }));
  };

  showButtons = () => {
    const { rows, columns } = this.state;

    this.setState({
      buttonsVisible: rows.length > 1 || columns.length > 1,

      removeRowButtonDisplay: rows.length > 1,

      removeColumnButtonDisplay: columns.length > 1
    });
  };

  hideButtons = () => {
    this.setState({
      buttonsVisible: false
    });
  };

  render() {
    const { cellSize } = this.props;

    const {
      rows,
      columns,
      buttonsVisible,
      removeRowButtonDisplay,
      removeColumnButtonDisplay,
      currentRowIndex,
      currentCellIndex
    } = this.state;

    return (
      <Wrapper>
        <Container ref={this.containerRef} onMouseOver={this.movingButtons}>
          <div onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
            <Table onMouseDown={this.onDragStart} onDragStart={() => false}>
              <tbody>
                {rows.map(row => (
                  <tr key={`row-${row}`} data-test="row">
                    {columns.map(cell => (
                      <Cell
                        data-test="cell"
                        key={`cell-${cell}`}
                        cellSize={cellSize}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            {removeRowButtonDisplay && (
              <RemoveRowButton
                data-test="remove-row-button"
                onClick={this.deleteRow}
                cellSize={cellSize}
                currentRowIndex={currentRowIndex}
                buttonsVisible={buttonsVisible}
              >
                -
              </RemoveRowButton>
            )}

            {removeColumnButtonDisplay && (
              <RemoveColumnButton
                data-test="remove-column-button"
                onClick={this.deleteColumn}
                cellSize={cellSize}
                currentCellIndex={currentCellIndex}
                buttonsVisible={buttonsVisible}
              >
                -
              </RemoveColumnButton>
            )}
          </div>
          <AddRowButton
            data-test="add-row-button"
            cellSize={cellSize}
            onClick={this.createRow}
          >
            +
          </AddRowButton>
          <AddColumnButton
            data-test="add-column-button"
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

Square.propTypes = {
  cellSize: PropTypes.number.isRequired,
  initialHeight: PropTypes.number.isRequired,
  initialWidth: PropTypes.number.isRequired
};
