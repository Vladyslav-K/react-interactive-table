import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  left: 0;
  top: 0;
  margin: ${props => props.cellSize * 2}px;
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
  background-color: #b20000;
  line-height: ${props => props.cellSize - props.cellSize / 5}px;
  display: block;
  visibility: hidden;
`;

const AddRowButton = styled(AddButtons)`
  top: 100%;
  left: 1px;
`;

const AddColumnButton = styled(AddButtons)`
  left: 100%;
  top: 1px;
`;

const RemoveRowButton = styled(RemoveButtons)`
  right: 100%;
  top: ${props => props.removeRowButtonTop}px
  margin: 1px 2px;
  visibility: ${props =>
    props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => (props.buttonsVisible === true ? 1 : 0)};
  display: ${props =>
    props.removeRowButtonDisplay === true ? "block" : "none"};
`;

const RemoveColumnButton = styled(RemoveButtons)`
  bottom: 100%;
  left: ${props => props.removeColumnButtonLeft}px
  margin: 2px 1px;
  visibility: ${props =>
    props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => (props.buttonsVisible === true ? 1 : 0)};
  display: ${props =>
    props.removeColumnButtonDisplay === true ? "block" : "none"};
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
