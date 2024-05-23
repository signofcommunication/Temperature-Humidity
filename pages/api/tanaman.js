import connectDB from "../lib/connectDB";
import {
  createTanaman,
  getAllTanamans,
  deleteTanaman,
  updateTanaman,
} from "../controllers/Tanaman";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  if (method === "POST") {
    try {
      const { Nama, Suhu, Kelembapan, Panen, Keterangan } = req.body;
      const data = await createTanaman(
        Nama,
        Suhu,
        Kelembapan,
        Panen,
        Keterangan
      );
      console.log("Created");

      return res.status(201).json({
        success: true,
        data,
        message: "Data Successfully Created",
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  } else if (method === "GET") {
    try {
      const data = await getAllTanamans();
      return res.status(200).json({ data });
    } catch (e) {
      console.log(e.message);
    }
  } else if (method === "DELETE") {
    try {
      const data = await deleteTanaman(req.body.id);
      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Tanaman not found" });
      }

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === "PATCH") {
    const data = await updateTanaman(req.body.id, req.body);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Tanaman not found" });
    }

    return res.status(200).json({ success: true, data });
  }
}
