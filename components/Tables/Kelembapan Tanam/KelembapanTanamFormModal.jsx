import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KelembapanTanamFormModal.module.css";

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
          `https://temperature-humidity-api.vercel.app/api/kelembapan_tanam/${selectedKelembapanTanam._id}`,
          formValues
        );
      } else {
        await axios.post(
          "https://temperature-humidity-api.vercel.app/api/kelembapan_tanam",
          formValues
        );
      }
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error saving the data", error);
    }
  };

  if (!open) return null; // Ensure modal is not rendered when `open` is false

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {selectedKelembapanTanam
            ? "Edit Kelembapan Tanam"
            : "Add Kelembapan Tanam"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="Tanam_no" className={styles.title_modal}>
              Tanam No
            </label>
            <select
              id="Tanam_no"
              name="Tanam_no"
              value={formValues.Tanam_no}
              onChange={handleChange}
              required
            >
              {tanamOptions.map(tanam => (
                <option key={tanam.Tanam_no} value={tanam.Tanam_no}>
                  {tanam.Tanam_no}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Catat_kelembapan" className={styles.title_modal}>
              Tanggal Catat Kelembapan
            </label>
            <input
              type="date"
              id="Catat_kelembapan"
              name="Catat_kelembapan"
              value={formValues.Catat_kelembapan}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Kelembapan" className={styles.title_modal}>
              Kelembapan
            </label>
            <input
              type="number"
              id="Kelembapan"
              name="Kelembapan"
              value={formValues.Kelembapan}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Keterangan" className={styles.title_modal}>
              Keterangan
            </label>
            <input
              type="text"
              id="Keterangan"
              name="Keterangan"
              value={formValues.Keterangan}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.buttonPrimary}>
            {selectedKelembapanTanam ? "Update" : "Create"}
          </button>
        </form>
        <button onClick={handleClose} className={styles.buttonSecondary}>
          Close
        </button>
      </div>
    </div>
  );
};

export default KelembapanTanamFormModal;
