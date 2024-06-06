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
import TanamanFormModal from "./TanamanFormModal";
import axios from "axios";

const TanamanTable = () => {
  const [data, setData] = useState([]);
  const [selectedTanaman, setSelectedTanaman] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/tanaman/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  const handleEdit = tanaman => {
    setSelectedTanaman(tanaman);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTanaman(null);
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Tanaman
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="tanaman table">
          <TableHead>
            <TableRow>
              <TableCell>Tanaman_ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell align="right">Suhu</TableCell>
              <TableCell align="right">Kelembapan</TableCell>
              <TableCell align="right">Panen</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <h1>Loading....</h1>
            ) : (
              data.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.Tanaman_ID}
                  </TableCell>
                  <TableCell>{row.Nama}</TableCell>
                  <TableCell align="right">{row.Suhu}</TableCell>
                  <TableCell align="right">{row.Kelembapan}</TableCell>
                  <TableCell align="right">{row.Panen}</TableCell>
                  <TableCell>{row.Keterangan}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TanamanFormModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedTanaman(null);
        }}
        selectedTanaman={selectedTanaman}
        fetchData={fetchData}
      />
    </div>
  );
};

export default TanamanTable;
