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
import TanamFormModal from "./TanamFormModal";
import axios from "axios";

const TanamTable = () => {
  const [data, setData] = useState([]);
  const [selectedTanam, setSelectedTanam] = useState(null);
  const [open, setOpen] = useState(false);
  const [tanamanOptions, setTanamanOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/tanam");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const fetchTanamanOptions = async () => {
    try {
      const response = await axios.get("/api/tanaman");
      setTanamanOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching tanaman options", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTanamanOptions();
  }, []);

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/tanam/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  const handleEdit = tanam => {
    setSelectedTanam(tanam);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTanam(null);
    setOpen(true);
  };

  console.log(data);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Tanam
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="tanam table">
          <TableHead>
            <TableRow>
              <TableCell>Tanam_no</TableCell>
              <TableCell>Tanaman_ID</TableCell>
              <TableCell>Tgl_semai</TableCell>
              <TableCell>Tgl_pindah</TableCell>
              <TableCell>Tgl_panen</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.Tanam_no}
                </TableCell>
                <TableCell>{row.Tanaman_ID ? row.Tanaman_ID : ""}</TableCell>
                <TableCell>
                  {new Date(row.Tgl_semai).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.Tgl_pindah).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.Tgl_panen).toLocaleDateString()}
                </TableCell>
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
                    onClick={() => handleDelete(row.Tanam_no)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TanamFormModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedTanam(null);
        }}
        selectedTanam={selectedTanam}
        fetchData={fetchData}
        tanamanOptions={tanamanOptions}
      />
    </div>
  );
};

export default TanamTable;
