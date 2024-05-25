import connectDB from "@/pages/lib/connectDB";
import {
  updatedSuhuTanam,
  deleteSuhuTanam,
} from "@/pages/controllers/Suhu_Tanam";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case "PATCH":
      const data = await updatedSuhuTanam(id, req.body);
      return res.status(200).json({ success: true, data });
      break;
    case "DELETE":
      const deleteData = await deleteSuhuTanam(id);
      return res
        .status(200)
        .json({
          success: true,
          message: "Data Successfully Deleted",
          data: deleteData,
        });
      break;
  }
}
