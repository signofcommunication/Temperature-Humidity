import connectDB from "@/pages/lib/connectDB";
import { Suhu_Tanam, Tanam } from "@/pages/model";
import getSuhuTanam from "@/pages/controllers/Suhu_Tanam/getSuhuTanam";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      try {
        const records = Array.isArray(req.body) ? req.body : [req.body];
        const createdRecords = await Suhu_Tanam.insertMany(records);
        res.status(201).json({ success: true, data: createdRecords });
      } catch (error) {
        console.error("Error creating Suhu_Tanam:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "GET":
      const data = await getSuhuTanam();
      res.status(200).json({ success: true, data });
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
