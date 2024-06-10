import React, { useState, useEffect } from "react";
import TanamanFormModal from "./TanamanFormModal";
import axios from "axios";
import styles from "./TanamanTable.module.css";

const TanamanTable = () => {
  const [data, setData] = useState([]);
  const [selectedTanaman, setSelectedTanaman] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://temperature-humidity-api.vercel.app/api/tanaman"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  fetchData();

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/tanaman/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  const handleEdit = tanaman => {
    setSelectedTanaman(tanaman);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTanaman(null);
    setOpen(true);
  };

  return (
    <>
      <button className={styles.buttonPrimary} onClick={handleAdd}>
        Add Tanaman
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tanaman_ID</th>
            <th>Nama</th>
            <th>Suhu</th>
            <th>Kelembapan</th>
            <th>Panen</th>
            <th>Keterangan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : (
            data.map(row => (
              <tr key={row.id}>
                <td>{row.Tanaman_ID}</td>
                <td>{row.Nama}</td>
                <td>{row.Suhu}</td>
                <td>{row.Kelembapan}</td>
                <td>{row.Panen}</td>
                <td>{row.Keterangan}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.buttonPrimary}
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.buttonSecondary}
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <TanamanFormModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedTanaman(null);
        }}
        selectedTanaman={selectedTanaman}
        fetchData={fetchData}
      />
    </>
  );
};

export default TanamanTable;
