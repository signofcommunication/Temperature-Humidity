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
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import KelembapanTanamModal from "./KelembapanTanamModal";

const KelembapanTanamTable = () => {
  const [kelembapanTanamData, setKelembapanTanamData] = useState([]);
  const [selectedKelembapanTanam, setSelectedKelembapanTanam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tanamOptions, setTanamOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/kelembapan_tanam");
      setKelembapanTanamData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const fetchTanamOptions = async () => {
    try {
      const response = await axios.get("/api/tanam");
      setTanamOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching the tanam options", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTanamOptions();
  }, []);

  const handleOpenModal = (kelembapanTanam = null) => {
    setSelectedKelembapanTanam(kelembapanTanam);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedKelembapanTanam(null);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/kelembapan_tanam/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
      >
        Add Kelembapan Tanam
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanam No</TableCell>
              <TableCell>Catat Kelembapan</TableCell>
              <TableCell>Kelembapan</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kelembapanTanamData ? (
              kelembapanTanamData.map(kelembapanTanam => (
                <TableRow key={kelembapanTanam._id}>
                  <TableCell>{kelembapanTanam.Tanam_no}</TableCell>
                  <TableCell>
                    {new Date(
                      kelembapanTanam.Catat_kelembapan
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {kelembapanTanam.Kelembapan["$numberDecimal"]}
                  </TableCell>
                  <TableCell>{kelembapanTanam.Keterangan}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenModal(kelembapanTanam)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(kelembapanTanam._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <KelembapanTanamModal
        open={modalOpen}
        handleClose={handleCloseModal}
        selectedKelembapanTanam={selectedKelembapanTanam}
        fetchData={fetchData}
        tanamOptions={tanamOptions}
      />
    </>
  );
};

export default KelembapanTanamTable;
