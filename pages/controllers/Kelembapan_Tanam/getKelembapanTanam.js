import { Kelembapan_Tanam } from "@/pages/model";

export default async function getKelembapanTanam() {
  try {
    const data = await Kelembapan_Tanam.find().exec();
    return data;
  } catch (error) {
    return error.message;
  }
}
