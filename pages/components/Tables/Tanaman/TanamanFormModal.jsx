import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TanamanFormModal = ({
  open,
  handleClose,
  selectedTanaman,
  setSelectedTanaman,
  fetchData,
}) => {
  const [formValues, setFormValues] = useState({
    Nama: "",
    Suhu: "",
    Kelembapan: "",
    Panen: "",
    Keterangan: "",
  });

  useEffect(() => {
    if (selectedTanaman) {
      setFormValues({
        Nama: selectedTanaman.Nama,
        Suhu: selectedTanaman.Suhu,
        Kelembapan: selectedTanaman.Kelembapan,
        Panen: selectedTanaman.Panen
          ? new Date(selectedTanaman.Panen).toISOString().split("T")[0]
          : "",
        Keterangan: selectedTanaman.Keterangan,
      });
    } else {
      setFormValues({
        Nama: "",
        Suhu: "",
        Kelembapan: "",
        Panen: "",
        Keterangan: "",
      });
    }
  }, [selectedTanaman]);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedTanaman) {
        await axios.put(`/api/tanaman/${selectedTanaman._id}`, formValues);
      } else {
        await axios.post("/api/tanaman", formValues);
      }
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error saving the data", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">
          {selectedTanaman ? "Edit Tanaman" : "Add Tanaman"}
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="Nama"
            label="Nama"
            value={formValues.Nama}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="Suhu"
            label="Suhu"
            type="number"
            value={formValues.Suhu}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="Kelembapan"
            label="Kelembapan"
            type="number"
            value={formValues.Kelembapan}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="Panen"
            label="Panen"
            type="date"
            value={formValues.Panen}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="Keterangan"
            label="Keterangan"
            value={formValues.Keterangan}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            {selectedTanaman ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TanamanFormModal;
