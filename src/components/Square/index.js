import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  margin: 0;
  padding: 0;

  user-select: none;
`;

const Container = styled.div`
  position: absolute;

  left: ${props => props.containerPosition.left};
  top: ${props => props.containerPosition.top};

  user-select: none;
`;

const Table = styled.table`
  border: 1px solid #48aae6;
  cursor: grab;
  user-select: none;
`;

const Cell = styled.td`
  height: ${props => props.cellSize}px;
  width: ${props => props.cellSize}px;

  padding: 0;

  background-color: #48aae6;

  user-select: none;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  height: ${props => props.cellSize}px;
  width: ${props => props.cellSize}px;
  margin: 2px;

  color: #ffffff;

  font-size: ${props => props.cellSize / 2}px;
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

  line-height: ${props => props.cellSize - props.cellSize / 5}px;
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
  visibility: ${props =>
    props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => (props.buttonsVisible === true ? 1 : 0)};

  top: ${props => props.buttonsPosition.top}px;
  right: 100%;
  margin: 3px 2px;
`;

const RemoveColumnButton = styled(RemoveButtons)`
  visibility: ${props =>
    props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => (props.buttonsVisible === true ? 1 : 0)};

  bottom: 100%;
  left: ${props => props.buttonsPosition.left}px;
  margin: 2px 3px;
`;

export default class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],

      containerPosition: {
        left: `${this.props.cellSize * 2}px`,
        top: `${this.props.cellSize * 2}px`
      },

      buttonsPosition: {
        left: 0,
        top: 0
      },

      buttonsVisible: false,
      removeRowButtonDisplay: true,
      removeColumnButtonDisplay: true,

      dragging: false
    };

    this.rowKey = 0;
    this.cellKey = 0;

    this.currentCellIndex = 0;
    this.currentRowIndex = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.onDrag = this.throttle(this.onDrag, 20);
  }

  throttle = (func, ms) => {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  };

  componentDidMount() {
    this.createSquare();
    this.container = document.querySelector("#container");
    console.log("Version 0.28. Created at 18.11.2019, 02:10");
  }

  createSquare = () => {
    const { rows, columns } = this.state;
    const cloneRows = [...rows];
    const cloneColumns = [...columns];

    const { initialHeight, initialWidth } = this.props;

    for (let cells = 0; cells < initialWidth; cells++) {
      cloneColumns[cells] = {
        key: this.cellKey++
      };
    }

    for (let rows = 0; rows < initialHeight; rows++) {
      cloneRows[rows] = {
        key: this.rowKey++,
        columns: cloneColumns
      };
    }

    this.setState({
      rows: cloneRows,
      columns: cloneColumns
    });
  };

  onDragStart = ({ clientX, clientY }) => {
    this.offsetX = clientX - this.container.getBoundingClientRect().left;
    this.offsetY = clientY - this.container.getBoundingClientRect().top;

    this.setState({
      dragging: true
    });
  };

  onDrag = ({ pageX, pageY }) => {
    const { dragging } = this.state;

    if (dragging) {
      this.container.style.left = pageX - this.offsetX + "px";
      this.container.style.top = pageY - this.offsetY + "px";
    }
  };

  onDragging = event => {
    event.persist();
    this.onDrag(event);
  };

  onDragEnd = () => {
    const container = this.container;
    const containerStyle = container.style;

    const cloneContainerPosition = { ...this.state.containerPosition };
    cloneContainerPosition.left = containerStyle.left;
    cloneContainerPosition.top = containerStyle.top;

    if (containerStyle.left && containerStyle.top) {
      this.setState({
        containerPosition: cloneContainerPosition
      });
      container.removeAttribute("style");
    }

    this.setState({
      dragging: false
    });
  };

  movingButtons = ({ target }) => {
    const { cellSize } = this.props;
    const { buttonsPosition } = this.state;
    const cloneButtonsPosition = { ...buttonsPosition };

    if (target.tagName === "TD") {
      /* In this formula "2" - the padding of each cell, for the correct movement
    of the button should be considered when calculating */
      this.currentCellIndex = target.cellIndex;
      this.currentRowIndex = target.parentNode.rowIndex;

      cloneButtonsPosition.left =
        cellSize * this.currentCellIndex + 2 * this.currentCellIndex;
      cloneButtonsPosition.top =
        cellSize * this.currentRowIndex + 2 * this.currentRowIndex;
    }

    this.setState({
      buttonsPosition: cloneButtonsPosition
    });
  };

  createColumn = () => {
    const { columns } = this.state;
    const cloneColumns = [...columns, { key: this.cellKey++ }];

    this.setState({
      columns: cloneColumns
    });
  };

  createRow = () => {
    const { rows, columns } = this.state;
    const cloneRows = [...rows, { key: this.rowKey++, columns }];

    this.setState({
      rows: cloneRows
    });
  };

  deleteColumn = () => {
    const { cellSize } = this.props;
    const { rows, columns, buttonsPosition } = this.state;
    const cloneButtonsPosition = { ...buttonsPosition };

    const cloneRows = [...rows];
    const cloneColumns = [...columns];

    const columnsLength = cloneColumns.length;
    const lastCellIndex = columnsLength - 1;

    if (columnsLength > 1) {
      cloneColumns.splice(this.currentCellIndex, 1);
    }

    if (this.currentCellIndex === lastCellIndex) {
      /* In this formula "2" - the padding of each cell, for the correct movement
      of the button should be considered when calculating */
      cloneButtonsPosition.left =
        cellSize * (this.currentCellIndex - 1) + 2 * this.currentCellIndex;

      this.currentCellIndex--;
    }

    if (lastCellIndex <= 1) {
      this.setState({
        removeColumnButtonDisplay: false
      });
    }

    this.setState({
      rows: cloneRows,
      columns: cloneColumns,
      buttonsPosition: cloneButtonsPosition
    });
  };

  deleteRow = () => {
    const { cellSize } = this.props;
    const { rows, buttonsPosition } = this.state;
    const cloneButtonsPosition = { ...buttonsPosition };

    const cloneRows = [...rows];

    const rowsLength = cloneRows.length;
    const lastRowIndex = rowsLength - 1;

    if (rowsLength > 1) {
      cloneRows.splice(this.currentRowIndex, 1);
    }

    if (this.currentRowIndex === lastRowIndex) {
      /* In this formula "2" - the padding of each cell, for the correct movement
    of the button should be considered when calculating */
      cloneButtonsPosition.top =
        cellSize * (this.currentRowIndex - 1) + 2 * this.currentRowIndex;

      this.currentRowIndex--;
    }

    if (lastRowIndex <= 1) {
      this.setState({
        removeRowButtonDisplay: false
      });
    }

    this.setState({
      rows: cloneRows,
      buttonsPosition: cloneButtonsPosition
    });
  };

  showButtons = () => {
    const { rows, columns } = this.state;

    if (rows.length > 1) {
      this.setState({
        buttonsVisible: true,
        removeRowButtonDisplay: true
      });
    }

    if (columns.length > 1) {
      this.setState({
        buttonsVisible: true,
        removeColumnButtonDisplay: true
      });
    }
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
      buttonsPosition,
      containerPosition
    } = this.state;

    return (
      <Wrapper onMouseMove={this.onDragging} onMouseUp={this.onDragEnd}>
        <Container
          id={"container"}
          containerPosition={containerPosition}
          cellSize={cellSize}
          onMouseOver={this.movingButtons}
        >
          <div onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
            <Table onMouseDown={this.onDragStart} onDragStart={() => false}>
              <tbody>
                {rows.map(row => (
                  <tr key={`row-${row.key}`} id="row">
                    {columns.map(cell => (
                      <Cell
                        key={`cell-${cell.key}`}
                        id="cell"
                        cellSize={cellSize}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            {removeRowButtonDisplay && (
              <RemoveRowButton
                id="remove-row-button"
                onClick={this.deleteRow}
                cellSize={cellSize}
                buttonsVisible={buttonsVisible}
                buttonsPosition={buttonsPosition}
              >
                -
              </RemoveRowButton>
            )}

            {removeColumnButtonDisplay && (
              <RemoveColumnButton
                id="remove-column-button"
                onClick={this.deleteColumn}
                cellSize={cellSize}
                buttonsVisible={buttonsVisible}
                buttonsPosition={buttonsPosition}
              >
                -
              </RemoveColumnButton>
            )}
          </div>
          <AddRowButton
            id="add-row-button"
            cellSize={cellSize}
            onClick={this.createRow}
          >
            +
          </AddRowButton>
          <AddColumnButton
            id="add-column-button"
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

Square.defaultProps = {
  cellSize: 50,
  initialHeight: 4,
  initialWidth: 4
};

Square.propTypes = {
  cellSize: PropTypes.number.isRequired,
  initialHeight: PropTypes.number.isRequired,
  initialWidth: PropTypes.number.isRequired
};
