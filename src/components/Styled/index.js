import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  position: relative;
  left: 0;
  top: 0;
  margin: 65px;
  border: 2px solid #48aae6;
  cursor: grab;
`;

const SquareContainer = styled.div`
  position: relative;
  padding: 2px 0 0 2px;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  height: ${props => props.cellSize}px;
  width: ${props => props.cellSize}px;

  background-color: #48aae6;

  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;

  height: ${props => props.cellSize}px;
  width: ${props => props.cellSize}px;

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
  line-height: 50px;
`;

const RemoveButtons = styled(Button)`
  background-color: #b20000;
  line-height: 40px;
  display: block;
  visibility: hidden;
`;

const AddRowButton = styled(AddButtons)`
  top: 100%;
  margin-top: 4px;
  margin-left: 2px;
`;

const AddColumnButton = styled(AddButtons)`
  left: 100%;
  top: 2px;
  margin-left: 4px;
`;

const RemoveRowButton = styled(RemoveButtons)`
  right: 100%;
  margin: 1px 2px;
`;

const RemoveColumnButton = styled(RemoveButtons)`
  bottom: 100%;
  margin: 2px 1px;
`;

export {
  Container,
  SquareContainer,
  Row,
  Cell,
  AddRowButton,
  AddColumnButton,
  RemoveRowButton,
  RemoveColumnButton
};
