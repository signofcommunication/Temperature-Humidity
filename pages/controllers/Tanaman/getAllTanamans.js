import Tanaman from "@/pages/model/Tanaman";

export default async function getAllTanamans() {
  try {
    const data = await Tanaman.find().exec();
    return data;
  } catch (error) {
    return error.message;
  }
}
