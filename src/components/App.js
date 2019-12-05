import React from "react";
import Container from "../components/container"
import Table from "../components/table";
import ButtonAddColumn from "../components/button-add-column";
import ButtonAddRow from "../components/button-add-row";

function App() {
  return (
    <Container>
      <Table />
      <ButtonAddColumn />
      <ButtonAddRow />
    </Container>
  );
}

export default App;
