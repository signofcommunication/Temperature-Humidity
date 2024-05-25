import { Kelembapan_Tanam } from "@/pages/model";

export default async function deleteKelembapanTanam(id) {
  try {
    const data = await Kelembapan_Tanam.findByIdAndDelete(id);

    if (!data) return "DAta Kelembapan Tanam Not Found";

    return data;
  } catch (error) {
    return error.message;
  }
}
