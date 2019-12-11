import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetX: 0,
      offsetY: 0,
      dragging: false
    };

    this.wrapperRef = React.createRef();

    this.container = document.createElement("div");
    this.container.className = "container";

    this.tableContainer = document.createElement("div");
    this.tableContainer.className = "table-container";
    this.container.append(this.tableContainer);

    this.table = document.createElement("table");
    this.tableContainer.append(this.table);

    this.addRowButton = document.createElement("div");
    this.addRowButton.className = "button add-row add";
    this.addRowButton.innerHTML = "+";
    this.container.append(this.addRowButton);

    this.addColumnButton = document.createElement("div");
    this.addColumnButton.className = "button add-column add";
    this.addColumnButton.innerHTML = "+";
    this.container.append(this.addColumnButton);

    this.removeRowButton = document.createElement("div");
    this.removeRowButton.className = "button remove-row remove";
    this.removeRowButton.innerHTML = "-";
    this.tableContainer.append(this.removeRowButton);

    this.removeColumnButton = document.createElement("div");
    this.removeColumnButton.className = "button remove-column remove";
    this.removeColumnButton.innerHTML = "-";
    this.tableContainer.append(this.removeColumnButton);

    this.addRowButton.addEventListener("click", () => this.createRow());
    this.addColumnButton.addEventListener("click", () => this.createCell());
    this.removeRowButton.addEventListener("click", () => this.deleteRow());
    this.removeColumnButton.addEventListener("click", () => this.deleteCell());

    this.container.addEventListener("mouseover", event =>
      this.movingButtons(event)
    );
    this.tableContainer.addEventListener("mouseenter", () =>
      this.showButtons()
    );
    this.tableContainer.addEventListener("mouseleave", () =>
      this.hideButtons()
    );

    this.table.addEventListener("mousedown", event => this.onDragStart(event));
    this.table.ondragstart = () => false;

    for (let row = 0; row < this.props.rows; row++) {
      const addRow = this.table.insertRow(row);

      for (let cells = 0; cells < this.props.columns; cells++) {
        addRow.insertCell(cells);
      }
    }
  }

  componentDidMount = () => {
    this.wrapperRef.current.append(this.container);
    this.wrapperRef.current.addEventListener("mousemove", event =>
      this.onDragging(event)
    );
    this.wrapperRef.current.addEventListener("mouseup", () => this.onDragEnd());
  };

  onDragStart = ({ clientX, clientY }) => {
    let { dragging, offsetX, offsetY } = this.state;

    this.container.style.position = "absolute";
    dragging = true;
    offsetX = clientX - this.container.getBoundingClientRect().left;
    offsetY = clientY - this.container.getBoundingClientRect().top;

    this.setState({
      dragging,
      offsetX,
      offsetY
    });
  };

  onDragging = ({ pageX, pageY }) => {
    if (this.state.dragging) {
      this.container.style.margin = 0;
      this.container.style.left = pageX - this.state.offsetX + "px";
      this.container.style.top = pageY - this.state.offsetY + "px";
    }
  };

  onDragEnd = () => {
    this.setState({ dragging: false });
    this.container.style.position = "relative";
  };

  movingButtons = ({ target }) => {
    if (target.tagName === "TD") {
      this.removeColumnButton.style.left = `${target.offsetLeft}px`;
      this.removeRowButton.style.top = `${target.offsetTop}px`;
      this.currentCellIndex = target.cellIndex;
      this.currentRowIndex = target.parentNode.rowIndex;
    }
  };

  createCell = () => {
    const rows = this.table.rows;

    for (let i = 0; i < rows.length; i++) {
      rows[i].insertCell();
    }
  };

  createRow = () => {
    this.table.insertRow();
    const rows = this.table.rows;

    for (let i = 0; i < rows[0].cells.length; i++) {
      rows[rows.length - 1].insertCell(i);
    }
  };

  deleteCell = () => {
    const rows = this.table.rows;

    const cells = rows[0].cells;
    const lastCellIndex = cells.length - 1;

    for (let i = 0; i < rows.length; i++) {
      rows[i].deleteCell(this.currentCellIndex);
    }

    if (this.currentCellIndex === lastCellIndex) {
      const lastCellOffsetLeft = cells[lastCellIndex - 1].offsetLeft;
      this.removeColumnButton.style.left = `${lastCellOffsetLeft}px`;
      this.currentCellIndex--;
    }

    if (rows[0].cells.length <= 1) {
      this.removeColumnButton.style.display = "none";
    }
  };

  deleteRow = () => {
    const rows = this.table.rows;
    const lastRowIndex = rows.length - 1;

    this.table.deleteRow(this.currentRowIndex);

    if (this.currentRowIndex === lastRowIndex) {
      const lastRowOffset = rows[rows.length - 1].offsetTop;
      this.removeRowButton.style.top = `${lastRowOffset}px`;
      this.currentRowIndex--;
    }

    if (rows.length <= 1) {
      this.removeRowButton.style.display = "none";
    }
  };

  showButtons = () => {
    if (this.table.rows.length > 1) {
      this.removeRowButton.style.visibility = "visible";
      this.removeRowButton.style.display = "block";
      this.removeRowButton.style.opacity = 1;
    }

    if (this.table.rows[0].cells.length > 1) {
      this.removeColumnButton.style.visibility = "visible";
      this.removeColumnButton.style.display = "block";
      this.removeColumnButton.style.opacity = 1;
    }
  };

  hideButtons = () => {
    this.removeRowButton.style.visibility = "hidden";
    this.removeColumnButton.style.visibility = "hidden";
    this.removeRowButton.style.opacity = 0;
    this.removeColumnButton.style.opacity = 0;
  };

  render() {
    return <div className="wrapper" ref={this.wrapperRef}></div>;
  }
}
