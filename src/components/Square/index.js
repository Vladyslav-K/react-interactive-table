import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: inline-block;

  position: relative;

  left: ${props => props.containerPosition.left}px;
  top: ${props => props.containerPosition.top}px;
`;

const Table = styled.table`
  border: 1px solid #48aae6;
  cursor: grab;
`;

const Cell = styled.td`
  height: ${props => props.cellSize}px;
  width: ${props => props.cellSize}px;

  padding: 0;

  background-color: #48aae6;
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

  &:hover {
    opacity: 0.8;
    transition-duration: 0.5s;
  }
`;

const AddButtons = styled(Button)`
  background-color: #f3a500;
`;

const RemoveButtons = styled(Button)`
  display: block;
  visibility: hidden;

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
  display: ${props =>
    props.removeRowButtonDisplay === true ? "block" : "none"};
  visibility: ${props =>
    props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => (props.buttonsVisible === true ? 1 : 0)};

  top: ${props => props.removeRowButtonTop}px;
  right: 100%;

  margin: 1px 2px;
`;

const RemoveColumnButton = styled(RemoveButtons)`
  display: ${props =>
    props.removeColumnButtonDisplay === true ? "block" : "none"};
  visibility: ${props =>
    props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => (props.buttonsVisible === true ? 1 : 0)};

  bottom: 100%;
  left: ${props => props.removeColumnButtonLeft}px;

  margin: 2px 1px;
`;

export default class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      square: [],

      containerPosition: {
        left: this.props.cellSize * 2,
        top: this.props.cellSize * 2
      },

      currentCellIndex: 0,
      currentRowIndex: 0,

      buttonsVisible: false,
      removeRowButtonDisplay: true,
      removeColumnButtonDisplay: true,

      removeRowButtonTop: 0,
      removeColumnButtonLeft: 0,

      dragging: false,
      offsetX: 0,
      offsetY: 0
    };

    this.containerRef = React.createRef();
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
        columns[cells] = {};
      }

      square[rows] = {
        columns: columns
      };
    }

    this.setState({
      square,
      key
    });
  };

  onDragStart = ({ clientX, clientY }) => {
    let { offsetX, offsetY } = this.state;

    offsetX = clientX - this.containerRef.current.getBoundingClientRect().left;
    offsetY = clientY - this.containerRef.current.getBoundingClientRect().top;

    this.setState({
      dragging: true,
      offsetX,
      offsetY
    });
  };

  onDragging = ({ pageX, pageY }) => {
    let { offsetX, offsetY, containerPosition, dragging } = this.state;

    if (dragging) {
      containerPosition.left = pageX - offsetX;
      containerPosition.top = pageY - offsetY;

      this.setState({
        containerPosition
      });
    }
  };

  onDragEnd = () => {
    this.setState({
      dragging: false
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
    let {
      square,
      buttonsVisible,
      removeRowButtonDisplay,
      removeColumnButtonDisplay
    } = this.state;

    if (square.length > 1) {
      buttonsVisible = true;
      removeRowButtonDisplay = true;
    }

    if (square[0].columns.length > 1) {
      buttonsVisible = true;
      removeColumnButtonDisplay = true;
    }

    if (square.length <= 1) {
      removeRowButtonDisplay = false;
    }

    if (square[0].columns.length <= 1) {
      removeColumnButtonDisplay = false;
    }

    this.setState({
      buttonsVisible,
      removeRowButtonDisplay,
      removeColumnButtonDisplay
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
      square,
      buttonsVisible,
      removeRowButtonDisplay,
      removeColumnButtonDisplay,
      removeRowButtonTop,
      removeColumnButtonLeft,
      containerPosition
    } = this.state;

    return (
      <Wrapper onMouseMove={this.onDragging} onMouseUp={this.onDragEnd}>
        <Container
          ref={this.containerRef}
          containerPosition={containerPosition}
          cellSize={cellSize}
          onMouseOver={this.movingButtons}
        >
          <div onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
            <Table onMouseDown={this.onDragStart} onDragStart={() => false}>
              <tbody>
                {square.map((row, index) => (
                  <tr key={`row-${index}`}>
                    {row.columns.map((cell, index) => (
                      <Cell key={`cell-${index}`} cellSize={cellSize} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            <RemoveRowButton
              onClick={this.deleteRow}
              cellSize={cellSize}
              buttonsVisible={buttonsVisible}
              removeRowButtonDisplay={removeRowButtonDisplay}
              removeRowButtonTop={removeRowButtonTop}
            >
              -
            </RemoveRowButton>
            <RemoveColumnButton
              onClick={this.deleteColumn}
              cellSize={cellSize}
              buttonsVisible={buttonsVisible}
              removeColumnButtonDisplay={removeColumnButtonDisplay}
              removeColumnButtonLeft={removeColumnButtonLeft}
            >
              -
            </RemoveColumnButton>
          </div>
          <AddRowButton cellSize={cellSize} onClick={this.createRow}>
            +
          </AddRowButton>
          <AddColumnButton cellSize={cellSize} onClick={this.createColumn}>
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
