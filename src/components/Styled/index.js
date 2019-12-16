import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: inline-block;

  position: ${props =>
    props.dragging === true ? "absolute" : "relative"};

  left: ${props => props.containerLeft}px;
  top: ${props => props.containerTop}px;
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

export {
  Wrapper,
  Container,
  Table,
  Cell,
  AddRowButton,
  AddColumnButton,
  RemoveRowButton,
  RemoveColumnButton
};
