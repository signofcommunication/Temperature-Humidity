import createTanam from "@/pages/controllers/Tanam/createTanam";
import getTanam from "@/pages/controllers/Tanam/getAllTanam";

// import { getTanam as getAllTanam } from "@/pages/controllers/Tanam/getAllTanam";
import connectDB from "@/pages/lib/connectDB";
// import { getAllTanam, createTanam } from "@/pages/controllers/Tanam";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { Tanaman_ID, Tgl_semai, Tgl_pindah, Tgl_panen, Keterangan } =
          req.body;

        const tanam = await createTanam(
          Tanaman_ID,
          Tgl_semai,
          Tgl_pindah,
          Tgl_panen,
          Keterangan
        );

        return res.status(201).json({ success: true, data: tanam });
      } catch (error) {
        return error.message;
      }
    case "GET":
      try {
        const data = await getTanam();
        return res.status(200).json({ success: true, data });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
}
