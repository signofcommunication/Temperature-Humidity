import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import SuhuTanamFormModal from "./SuhuTanamModal";

const SuhuTanamTable = () => {
  const [suhuTanamData, setSuhuTanamData] = useState([]);
  const [selectedSuhuTanam, setSelectedSuhuTanam] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [tanamOptions, setTanamOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/suhu_tanam");
      setSuhuTanamData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const fetchTanamOptions = async () => {
    try {
      const response = await axios.get("/api/tanam");
      setTanamOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching Tanam options", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTanamOptions();
  }, []);

  const handleOpenModal = (suhuTanam = null) => {
    setSelectedSuhuTanam(suhuTanam);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSuhuTanam(null);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/suhu_tanam/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  console.log(suhuTanamData);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
      >
        Add Suhu Tanam
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanam No</TableCell>
              <TableCell>Catat Suhu</TableCell>
              <TableCell>Suhu</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suhuTanamData.map(suhuTanam => (
              <TableRow key={suhuTanam._id}>
                <TableCell>{suhuTanam.Tanam_no}</TableCell>
                <TableCell>
                  {new Date(suhuTanam.Catat_suhu).toLocaleDateString()}
                </TableCell>
                <TableCell>{suhuTanam.Suhu["$numberDecimal"]}</TableCell>
                <TableCell>{suhuTanam.Keterangan}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenModal(suhuTanam)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(suhuTanam._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SuhuTanamFormModal
        open={modalOpen}
        handleClose={handleCloseModal}
        selectedSuhuTanam={selectedSuhuTanam}
        fetchData={fetchData}
        tanamOptions={tanamOptions}
      />
    </>
  );
};

export default SuhuTanamTable;
