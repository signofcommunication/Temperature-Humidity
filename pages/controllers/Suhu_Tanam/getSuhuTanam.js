import { Suhu_Tanam } from "@/pages/model";

export default async function getSuhuTanam() {
  try {
    const data = await Suhu_Tanam.find().exec();
    console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
}
