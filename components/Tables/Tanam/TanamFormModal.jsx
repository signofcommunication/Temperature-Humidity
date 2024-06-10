import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
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

const TanamFormModal = ({
  open,
  handleClose,
  selectedTanam,
  fetchData,
  tanamanOptions,
}) => {
  const [formValues, setFormValues] = useState({
    Tanaman_ID: "",
    Tgl_semai: "",
    Tgl_pindah: "",
    Tgl_panen: "",
    Keterangan: "",
  });
  console.log({ formValues, selectedTanam });

  useEffect(() => {
    if (selectedTanam) {
      setFormValues({
        Tanaman_ID: selectedTanam.Tanaman_ID,
        Tgl_semai: selectedTanam.Tgl_semai
          ? new Date(selectedTanam.Tgl_semai).toISOString().split("T")[0]
          : "",
        Tgl_pindah: selectedTanam.Tgl_pindah
          ? new Date(selectedTanam.Tgl_pindah).toISOString().split("T")[0]
          : "",
        Tgl_panen: selectedTanam.Tgl_panen
          ? new Date(selectedTanam.Tgl_panen).toISOString().split("T")[0]
          : "",
        Keterangan: selectedTanam.Keterangan,
      });
    } else {
      setFormValues({
        Tanaman_ID: "",
        Tgl_semai: "",
        Tgl_pindah: "",
        Tgl_panen: "",
        Keterangan: "",
      });
    }
  }, [selectedTanam]);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedTanam) {
        await axios.patch(
          `https://temperature-humidity-api.vercel.app/api/tanam/${selectedTanam.Tanam_no}`,
          formValues
        );
      } else {
        await axios.post("/api/tanam", formValues);
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
        <h2 id="modal-title">{selectedTanam ? "Edit Tanam" : "Add Tanam"}</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="Tanaman_ID"
            label="Tanaman ID"
            select
            SelectProps={{
              native: true,
            }}
            value={formValues.Tanaman_ID}
            onChange={handleChange}
            required
          >
            <option value="">Select Tanaman</option>
            {tanamanOptions.map(tanaman => (
              <option key={tanaman.Tanaman_ID} value={tanaman.Tanaman_ID}>
                {tanaman.Nama}({tanaman.Tanaman_ID})
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            name="Tgl_semai"
            label="Tanggal Semai"
            type="date"
            value={formValues.Tgl_semai}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="Tgl_pindah"
            label="Tanggal Pindah"
            type="date"
            value={formValues.Tgl_pindah}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="Tgl_panen"
            label="Tanggal Panen"
            type="date"
            value={formValues.Tgl_panen}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
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
            {selectedTanam ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TanamFormModal;
