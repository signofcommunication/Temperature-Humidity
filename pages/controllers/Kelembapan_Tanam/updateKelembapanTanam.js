import { Kelembapan_Tanam } from "@/pages/model";

export default async function updateKelembapanTanam(id, response) {
  try {
    const data = await Kelembapan_Tanam.findByIdAndUpdate(id, response, {
      new: true,
      runValidators: true,
    });

    if (!data) return "Kelembapan Tanam Not Found";

    return data;
  } catch (error) {
    return error.message;
  }
}
