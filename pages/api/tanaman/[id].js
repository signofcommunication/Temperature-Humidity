import connectDB from "@/pages/lib/connectDB";
import { deleteTanaman, updateTanaman } from "@/pages/controllers/Tanaman";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case "DELETE":
      try {
        const deletedTanaman = await deleteTanaman(id);
        return res.status(200).json({
          success: true,
          data: deletedTanaman,
          message: "Data Successfully deleted",
        });
      } catch (error) {
        return error.message;
      }

      break;
    case "PATCH":
      try {
        const data = await updateTanaman(id, req.body);

        if (!data) {
          return res
            .status(404)
            .json({ success: false, message: "Tanaman not found" });
        }

        return res.status(200).json({ success: true, data });
      } catch (error) {
        return error.message;
      }

    default:
      break;
  }
}
