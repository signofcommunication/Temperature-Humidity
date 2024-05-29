import { useEffect, useState } from "react";
import axios from "axios";
import { TanamanTable } from "./components";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/tanaman");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Tanaman Data</h1>
      <TanamanTable data={data} fetchData={fetchData} />
    </div>
  );
}
