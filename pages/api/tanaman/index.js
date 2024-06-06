import createTanaman from "@/pages/controllers/Tanaman/createTanaman";
import getAllTanamans from "@/pages/controllers/Tanaman/getAllTanamans";
import connectDB from "@/pages/lib/connectDB";
// import { getAllTanamans, createTanaman } from "@/pages/controllers/Tanaman";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { Nama, Suhu, Kelembapan, Panen, Keterangan } = req.body;
        const data = await createTanaman(
          Nama,
          Suhu,
          Kelembapan,
          Panen,
          Keterangan
        );

        return res.status(201).json({
          success: true,
          data,
          message: "Data Successfully Created",
        });
      } catch (error) {
        return error.message;
      }
      break;
    case "GET":
      try {
        const data = await getAllTanamans();
        return res.status(200).json({ data });
      } catch (e) {
        console.log(e.message);
        return e.message;
      }

    default:
      break;
  }
}
