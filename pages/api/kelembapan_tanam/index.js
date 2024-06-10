import createKelembapanTanam from "@/pages/controllers/Kelembapan_Tanam/createKelembapanTanam";
import getKelembapanTanam from "@/pages/controllers/Kelembapan_Tanam/getKelembapanTanam";
import connectDB from "@/pages/lib/connectDB";
// import {
//   getKelembapanTanam,
//   createKelembapanTanam,
// } from "@/pages/controllers/Kelembapan_Tanam";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "GET":
      const data = await getKelembapanTanam();
      return res.status(200).json({ success: true, data });
      break;
    case "POST":
      const createData = await createKelembapanTanam(req.body);
      return res.status(201).json({ success: true, data: createData });
    default:
      break;
  }
}
