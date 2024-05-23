import { Tanam } from "@/pages/model";

export default async function updateTanam(Tanam_no, updateData) {
  try {
    const data = await Tanam.findByIdAndUpdate({ Tanam_no }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return "Tanam Not Found!";
    }

    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
