import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SuhuTanamTable.module.css";
import SuhuTanamFormModal from "./SuhuTanamModal";

const SuhuTanamTable = () => {
  const [suhuTanamData, setSuhuTanamData] = useState([]);
  const [selectedSuhuTanam, setSelectedSuhuTanam] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [tanamOptions, setTanamOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://temperature-humidity-api.vercel.app/api/suhu_tanam"
      );
      setSuhuTanamData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const fetchTanamOptions = async () => {
    try {
      const response = await axios.get(
        "https://temperature-humidity-api.vercel.app/api/tanam"
      );
      setTanamOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching Tanam options", error);
    }
  };

  fetchData();
  fetchTanamOptions();

  const handleOpenModal = (suhuTanam = null) => {
    setSelectedSuhuTanam(suhuTanam);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSuhuTanam(null);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/suhu_tanam/${id}`);
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
        Add Suhu Tanam
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tanam No</th>
              <th>Catat Suhu</th>
              <th>Suhu</th>
              <th>Keterangan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suhuTanamData.length === 0 ? (
              <tr>
                <td>Loading</td>
              </tr>
            ) : (
              suhuTanamData.map(suhuTanam => (
                <tr key={suhuTanam._id}>
                  <td>{suhuTanam.Tanam_no}</td>
                  <td>{new Date(suhuTanam.Catat_suhu).toLocaleDateString()}</td>
                  <td>{suhuTanam.Suhu["$numberDecimal"]}</td>
                  <td>{suhuTanam.Keterangan}</td>
                  <td>
                    <button
                      className={`${styles.button} ${styles.buttonOutline} ${styles.buttonPrimary}`}
                      onClick={() => handleOpenModal(suhuTanam)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSecondary}`}
                      onClick={() => handleDelete(suhuTanam._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SuhuTanamFormModal
        open={modalOpen}
        handleClose={handleCloseModal}
        selectedSuhuTanam={selectedSuhuTanam}
        fetchData={fetchData}
        tanamOptions={tanamOptions}
      />
    </>
  );
};

export default SuhuTanamTable;
