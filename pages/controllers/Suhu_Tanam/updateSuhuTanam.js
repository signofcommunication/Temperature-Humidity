import { Suhu_Tanam } from "@/pages/model";

export default async function updateSuhuTanam(id, response) {
  try {
    const updatedSuhuTanam = await Suhu_Tanam.findByIdAndUpdate(id, response, {
      new: true,
      runValidators: true,
    });
    if (!updatedSuhuTanam) {
      return "Suhu_Tanam not found";
    }

    return updatedSuhuTanam;
  } catch (error) {
    return error.message;
  }
}
