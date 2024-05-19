import { Tanaman } from "@/pages/model";

export default async function getAllTanamans() {
  try {
    const data = await Tanaman.find().exec();
    return data;
  } catch (error) {
    return error.message;
  }
}
