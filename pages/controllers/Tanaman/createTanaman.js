import { Tanaman } from "@/pages/model";

export default async function createTanaman(
  Nama,
  Suhu,
  Kelembapan,
  Panen,
  Keterangan,
  res
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
    res.status(400).json({ success: false, error: error.message });
  }
}
