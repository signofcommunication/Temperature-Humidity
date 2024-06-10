import Tanaman from "@/pages/model/Tanaman";

export default async function deleteTanaman(id) {
  try {
    const tanaman = await Tanaman.findByIdAndDelete(id);

    return tanaman;
  } catch (error) {
    console.log(error);
    return error.messsage;
  }
}
