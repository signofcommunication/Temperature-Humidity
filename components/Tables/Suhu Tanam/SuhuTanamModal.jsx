import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SuhuTanamFormModal.module.css";

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
        Suhu: selectedSuhuTanam.Suhu["$numberDecimal"],
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
          `https://temperature-humidity-api.vercel.app/api/suhu_tanam/${selectedSuhuTanam._id}`,
          formValues
        );
      } else {
        await axios.post(
          "https://temperature-humidity-api.vercel.app/api/suhu_tanam",
          formValues
        );
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
        <h2>{selectedSuhuTanam ? "Edit Suhu Tanam" : "Add Suhu Tanam"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="Tanam_no" className={styles.label}>
              Tanam No
            </label>
            <select
              id="Tanam_no"
              name="Tanam_no"
              value={formValues.Tanam_no}
              onChange={handleChange}
              required
              className={styles.input}
            >
              {tanamOptions.map(tanam => (
                <option key={tanam._id} value={tanam.Tanam_no}>
                  {tanam.Tanam_no}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Catat_suhu" className={styles.label}>
              Tanggal Catat Suhu
            </label>
            <input
              type="date"
              id="Catat_suhu"
              name="Catat_suhu"
              value={formValues.Catat_suhu}
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
            {selectedSuhuTanam ? "Update" : "Create"}
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

export default SuhuTanamFormModal;
