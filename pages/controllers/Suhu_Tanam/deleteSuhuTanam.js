import Suhu_Tanam from "@/pages/model/Suhu_Tanam";

export default async function deleteSuhuTanam(id) {
  try {
    const data = await Suhu_Tanam.findByIdAndDelete(id);

    if (!data) {
      return "Suhu Tanam Not Found!";
    }

    return data;
  } catch (error) {
    return error.message;
  }
}
