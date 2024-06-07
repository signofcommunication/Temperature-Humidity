import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KelembapanTanamTable.module.css";
import KelembapanTanamFormModal from "./KelembapanTanamFormModal"; // Ensure correct import

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
      <button
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={() => handleOpenModal()}
      >
        Add Kelembapan Tanam
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tanam No</th>
            <th>Catat Kelembapan</th>
            <th>Kelembapan</th>
            <th>Keterangan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kelembapanTanamData.length === 0 ? (
            <tr>
              <td colSpan="5">Loading.....</td>
            </tr>
          ) : (
            kelembapanTanamData.map(kelembapanTanam => (
              <tr key={kelembapanTanam._id}>
                <td>{kelembapanTanam.Tanam_no}</td>
                <td>
                  {new Date(
                    kelembapanTanam.Catat_kelembapan
                  ).toLocaleDateString()}
                </td>
                <td>{kelembapanTanam.Kelembapan["$numberDecimal"]}</td>
                <td>{kelembapanTanam.Keterangan}</td>
                <td>
                  <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={() => handleOpenModal(kelembapanTanam)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={() => handleDelete(kelembapanTanam._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <KelembapanTanamFormModal
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
