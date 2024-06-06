import {
  TanamanTable,
  TanamTable,
  SuhuTanamTable,
  KelembapanTanamTable,
} from "../components";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <TanamanTable />
      <TanamTable />
      <SuhuTanamTable />
      <KelembapanTanamTable />
    </React.Fragment>
  );
};

export default Home;
