import KelembapanTanamTable from "../components/Tables/Kelembapan Tanam/KelembapanTanamTable";
import SuhuTanamTable from "../components/Tables/Suhu Tanam/SuhuTanamTabel";
import TanamTable from "../components/Tables/Tanam/TanamTable";
import TanamanTable from "../components/Tables/Tanaman/TanamanTable";

const Home = () => {
  return (
    <div>
      <TanamanTable />
      <TanamTable />
      <SuhuTanamTable />
      <KelembapanTanamTable />
    </div>
  );
};

export default Home;
