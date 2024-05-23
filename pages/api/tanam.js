import {
  createTanam,
  getAllTanam,
  deleteTanam,
  updateTanam,
} from "../controllers/Tanam";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  console.log(req.body.Tanam_No);
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

        res.status(201).json({ success: true, data: tanam });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "GET":
      try {
        const data = await getAllTanam();
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const { Tanam_No } = req.body;
        const data = await deleteTanam(Tanam_No);
        console.log(data);

        if (!data) {
          return res
            .status(404)
            .json({ success: false, message: `Tanam Not Found` });
        }

        return res.status(200).json({ success: true, data });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      break;
    case "PATCH":
      try {
        const { Tanam_No } = req.body;
        const tanamNo = parseInt(Tanam_No, 10);

        if (isNaN(tanamNo)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid tanam_no" });
        }

        const data = await updateTanam(tanamNo, req.body);

        console.log(data);

        if (!data) {
          return res
            .status(404)
            .json({ success: false, message: `Tanam Not Found` });
        }

        return res.status(200).json({ success: true, data });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

      break;
  }
}
