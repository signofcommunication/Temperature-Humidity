import React, { useState, useEffect } from "react";
import TanamFormModal from "./TanamFormModal";
import axios from "axios";
import styles from "./TanamTable.module.css";

const TanamTable = () => {
  const [data, setData] = useState([]);
  const [selectedTanam, setSelectedTanam] = useState(null);
  const [open, setOpen] = useState(false);
  const [tanamanOptions, setTanamanOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://temperature-humidity-api.vercel.app/api/tanam"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const fetchTanamanOptions = async () => {
    try {
      const response = await axios.get(
        "https://temperature-humidity-api.vercel.app/api/tanaman"
      );
      setTanamanOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching tanaman options", error);
    }
  };

  fetchData();
  fetchTanamanOptions();

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/tanam/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  const handleEdit = tanam => {
    setSelectedTanam(tanam);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTanam(null);
    setOpen(true);
  };

  console.log(data);

  return (
    <>
      <button
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={handleAdd}
      >
        Add Tanam
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="tanam table">
          <thead>
            <tr>
              <th className={styles.cell}>No Tanam</th>
              <th className={styles.cell}>ID</th>
              <th className={styles.cell}>Tanggal Semai</th>
              <th className={styles.cell}>Tanggal Pindah</th>
              <th className={styles.cell}>Tanggal Panen</th>
              <th className={styles.cell}>Keterangan</th>
              <th className={styles.cell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className={styles.cell} colSpan="7">
                  Loading....
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row._id}>
                  <td className={styles.cell}>{row.Tanam_no}</td>
                  <td className={styles.cell}>
                    {row.Tanaman_ID ? row.Tanaman_ID : ""}
                  </td>
                  <td className={styles.cell}>
                    {new Date(row.Tgl_semai).toLocaleDateString()}
                  </td>
                  <td className={styles.cell}>
                    {new Date(row.Tgl_pindah).toLocaleDateString()}
                  </td>
                  <td className={styles.cell}>
                    {new Date(row.Tgl_panen).toLocaleDateString()}
                  </td>
                  <td className={styles.cell}>{row.Keterangan}</td>
                  <td className={styles.cell}>
                    <button
                      className={`${styles.button} ${styles.buttonPrimary}`}
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.button} ${styles.buttonSecondary}`}
                      onClick={() => handleDelete(row.Tanam_no)}
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
      <TanamFormModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedTanam(null);
        }}
        selectedTanam={selectedTanam}
        fetchData={fetchData}
        tanamanOptions={tanamanOptions}
      />
    </>
  );
};

export default TanamTable;
