import Tanam from "@/pages/model/Tanam";

export default async function getTanam() {
  try {
    const data = await Tanam.find().exec();
    return data;
  } catch (error) {
    return error.message;
  }
}
