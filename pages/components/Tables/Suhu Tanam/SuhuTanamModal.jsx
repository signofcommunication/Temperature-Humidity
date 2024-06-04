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

const SuhuTanamFormModal = ({
  open,
  handleClose,
  selectedSuhuTanam,
  fetchData,
  tanamOptions,
}) => {
  const [formValues, setFormValues] = useState({
    Tanam_no: "",
    Catat_suhu: "",
    Suhu: "",
    Keterangan: "",
  });

  useEffect(() => {
    if (selectedSuhuTanam) {
      setFormValues({
        Tanam_no: selectedSuhuTanam.Tanam_no,
        Catat_suhu: selectedSuhuTanam.Catat_suhu
          ? new Date(selectedSuhuTanam.Catat_suhu).toISOString().split("T")[0]
          : "",
        Suhu: selectedSuhuTanam.Suhu,
        Keterangan: selectedSuhuTanam.Keterangan,
      });
    } else {
      setFormValues({
        Tanam_no: "",
        Catat_suhu: "",
        Suhu: "",
        Keterangan: "",
      });
    }
  }, [selectedSuhuTanam]);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedSuhuTanam) {
        await axios.patch(
          `/api/suhu_tanam/${selectedSuhuTanam._id}`,
          formValues
        );
      } else {
        await axios.post("/api/suhu_tanam", formValues);
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
          {selectedSuhuTanam ? "Edit Suhu Tanam" : "Add Suhu Tanam"}
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
              <MenuItem key={tanam._id} value={tanam.Tanam_no}>
                {tanam.Tanam_no}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            name="Catat_suhu"
            label="Tanggal Catat Suhu"
            type="date"
            value={formValues.Catat_suhu}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="Suhu"
            label="Suhu"
            type="number"
            value={formValues.Suhu["$numberDecimal"]}
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
            {selectedSuhuTanam ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SuhuTanamFormModal;
