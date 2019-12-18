import React from "react";
import Square from "../Square";
import styled from "styled-components";

const GlobalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 150px;
`;

function App() {
  return (
    <GlobalContainer>
      <Square initialWidth={4} initialHeight={4} cellSize={50} />
      <Square initialWidth={4} initialHeight={4} cellSize={50} />
    </GlobalContainer>
  );
}

export default App;
