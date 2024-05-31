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

const KelembapanTanamFormModal = ({
  open,
  handleClose,
  selectedKelembapanTanam,
  fetchData,
  tanamOptions,
}) => {
  const [formValues, setFormValues] = useState({
    Tanam_no: "",
    Catat_kelembapan: "",
    Kelembapan: "",
    Keterangan: "",
  });

  useEffect(() => {
    if (selectedKelembapanTanam) {
      setFormValues({
        Tanam_no: selectedKelembapanTanam.Tanam_no,
        Catat_kelembapan: selectedKelembapanTanam.Catat_kelembapan
          ? new Date(selectedKelembapanTanam.Catat_kelembapan)
              .toISOString()
              .split("T")[0]
          : "",
        Kelembapan: selectedKelembapanTanam.Kelembapan["$numberDecimal"],
        Keterangan: selectedKelembapanTanam.Keterangan,
      });
    } else {
      setFormValues({
        Tanam_no: "",
        Catat_kelembapan: "",
        Kelembapan: "",
        Keterangan: "",
      });
    }
  }, [selectedKelembapanTanam]);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedKelembapanTanam) {
        await axios.patch(
          `/api/kelembapan_tanam/${selectedKelembapanTanam._id}`,
          formValues
        );
      } else {
        await axios.post("/api/kelembapan_tanam", formValues);
      }
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error saving the data", error);
    }
  };

  console.log(tanamOptions);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">
          {selectedKelembapanTanam
            ? "Edit Kelembapan Tanam"
            : "Add Kelembapan Tanam"}
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="Tanam_no"
            label="Tanam No"
            select
            value={formValues.Tanam_no}
            onChange={handleChange}
            required
          >
            {tanamOptions.map(tanam => (
              <MenuItem key={tanam.Tanam_no} value={tanam.Tanam_no}>
                {tanam.Tanam_no}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            name="Catat_kelembapan"
            label="Tanggal Catat Kelembapan"
            type="date"
            value={formValues.Catat_kelembapan}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="Kelembapan"
            label="Kelembapan"
            type="number"
            value={formValues.Kelembapan["$numberDecimal"]}
            onChange={handleChange}
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
            {selectedKelembapanTanam ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default KelembapanTanamFormModal;
