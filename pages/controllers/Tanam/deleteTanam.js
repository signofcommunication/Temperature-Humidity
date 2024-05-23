import { Tanam } from "@/pages/model";

export default async function deleteTanam(Tanam_no) {
  try {
    const data = await Tanam.findOneAndDelete({ Tanam_no });

    if (!data) {
      return "Tanam Not Found";
    }

    return data;
  } catch (error) {
    return error.message;
  }
}
