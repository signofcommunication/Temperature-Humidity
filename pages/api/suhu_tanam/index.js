import connectDB from "@/pages/lib/connectDB";
import { Suhu_Tanam, Tanam } from "@/pages/model";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      try {
        const { Tanam_no, Catat_suhu, Suhu, Keterangan } = req.body;

        // Validate that the Tanam_no exists
        const tanam = await Tanam.findOne({ Tanam_no: Tanam_no });
        if (!tanam) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid Tanam_no" });
        }

        // Create a new Suhu_Tanam record
        const suhuTanam = new Suhu_Tanam({
          Tanam_no,
          Catat_suhu,
          Suhu,
          Keterangan,
        });

        await suhuTanam.save();

        res.status(201).json({ success: true, data: suhuTanam });
      } catch (error) {
        console.error("Error creating Suhu_Tanam:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
