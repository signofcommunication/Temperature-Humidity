import Kelembapan_Tanam from "@/pages/model/Kelembapan_Tanam";

export default async function createKelembapanTanam(request) {
  try {
    const records = Array.isArray(request) ? request : [request];
    const createRecords = await Kelembapan_Tanam.insertMany(records);
    return createRecords;
  } catch (error) {
    return error.message;
  }
}
