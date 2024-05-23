import { Tanam, Tanaman } from "@/pages/model";

export default async function createTanam(
  Tanaman_ID,
  Tgl_semai,
  Tgl_pindah,
  Tgl_panen,
  Keterangan
) {
  try {
    const tanaman = await Tanaman.findById(Tanaman_ID);

    if (!tanaman) {
      return;
    }

    const tanam = new Tanam({
      Tanaman_ID,
      Tgl_semai,
      Tgl_pindah,
      Tgl_panen,
      Keterangan,
    });

    await tanam.save();

    return tanam;
  } catch (error) {
    return error.message;
  }
}
