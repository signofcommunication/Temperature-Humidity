import Tanaman from "@/pages/model/Tanaman";

export default async function updateTanaman(id, response) {
  try {
    const updatedTanaman = await Tanaman.findByIdAndUpdate(id, response, {
      new: true,
      runValidators: true,
    });

    return updatedTanaman;
  } catch (error) {
    return error.message;
  }
}
