import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TanamanFormModal.module.css";

const TanamanFormModal = ({
  open,
  handleClose,
  selectedTanaman,
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
        Panen: selectedTanaman.Panen || "",
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
        await axios.patch(
          `/api/tanaman/${selectedTanaman.Tanaman_ID}`,
          formValues
        );
      } else {
        await axios.post("/api/tanaman", formValues);
      }
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error saving the data", error);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{selectedTanaman ? "Edit Tanaman" : "Add Tanaman"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="Nama" className={styles.label}>
              Nama
            </label>
            <input
              type="text"
              id="Nama"
              name="Nama"
              value={formValues.Nama}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Suhu" className={styles.label}>
              Suhu
            </label>
            <input
              type="number"
              id="Suhu"
              name="Suhu"
              value={formValues.Suhu}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Kelembapan" className={styles.label}>
              Kelembapan
            </label>
            <input
              type="number"
              id="Kelembapan"
              name="Kelembapan"
              value={formValues.Kelembapan}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Panen" className={styles.label}>
              Panen
            </label>
            <input
              type="number"
              id="Panen"
              name="Panen"
              value={formValues.Panen}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Keterangan" className={styles.label}>
              Keterangan
            </label>
            <input
              type="text"
              id="Keterangan"
              name="Keterangan"
              value={formValues.Keterangan}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            {selectedTanaman ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonClose}`}
            onClick={handleClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default TanamanFormModal;
