import { Tanaman } from "@/pages/model";

export default async function createTanaman(
  Nama,
  Suhu,
  Kelembapan,
  Panen,
  Keterangan
) {
  try {
    const newTanaman = new Tanaman({
      Nama,
      Suhu,
      Kelembapan,
      Panen,
      Keterangan,
    });
    await newTanaman.save();

    return newTanaman;
  } catch (error) {
    return error.message;
  }
}
