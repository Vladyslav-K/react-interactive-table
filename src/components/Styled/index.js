import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  position: relative;
  left: 0;
  top: 0;
  margin: ${props => props.cellSize * 2}px
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
`;

const RemoveButtons = styled(Button)`
  background-color: #b20000;
  line-height: ${props => props.cellSize - props.cellSize / 5}px;
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
  top: ${props => props.removeRowButtonTop}px
  margin-right: 4px;
  visibility: ${props => props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => props.buttonsVisible === true ? 1 : 0};
  display: ${props => props.buttonsDisplay === true ? "block" : "none"};
`;

const RemoveColumnButton = styled(RemoveButtons)`
  bottom: 100%;
  left: ${props => props.removeColumnButtonLeft}px
  margin-bottom: 4px;
  visibility: ${props => props.buttonsVisible === true ? "visible" : "hidden"};
  opacity: ${props => props.buttonsVisible === true ? 1 : 0};
  display: ${props => props.buttonsDisplay === true ? "block" : "none"};
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
