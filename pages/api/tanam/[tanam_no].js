// import { updateTanam } from "@/pages/controllers/Tanam";
import connectDB from "@/pages/lib/connectDB";
import { Tanam } from "@/pages/model";

export default async function handler(req, res) {
  const {
    query: { tanam_no },
    method,
  } = req;

  console.log(`Received tanam_no: ${tanam_no}, method: ${method}`);

  await connectDB();

  switch (method) {
    case "PATCH":
      try {
        // Ensure tanam_no is parsed as an integer
        const tanamNo = parseInt(tanam_no, 10);
        console.log(`Parsed tanam_no: ${tanamNo}`);

        // Validate that tanamNo is a valid integer
        if (isNaN(tanamNo)) {
          console.error("Invalid tanam_no:", tanam_no);
          return res
            .status(400)
            .json({ success: false, message: "Invalid tanam_no" });
        }

        console.log(`Updating Tanam with tanam_no: ${tanamNo}`);
        console.log("Update Data:", req.body);

        // Find and update the document
        const updatedTanam = await Tanam.findOneAndUpdate(
          { Tanam_no: tanamNo },
          req.body,
          { new: true, runValidators: true }
        );

        if (!updatedTanam) {
          console.log(`Tanam not found with tanam_no: ${tanamNo}`);
          return res
            .status(404)
            .json({ success: false, message: "Tanam not found" });
        }

        console.log("Updated Tanam:", updatedTanam);
        res.status(200).json({ success: true, data: updatedTanam });
      } catch (error) {
        console.error("Error updating Tanam:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      console.log(`Method ${method} not allowed`);
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}

// export default async function handler(req, res) {
//   const {
//     query: { tanam_no },
//     method,
//   } = req;

//   await connectDB();

//   console.log(tanam_no);
//   switch (method) {
//     case "PATCH":
//       try {
//         const tanamNo = parseInt(tanam_no, 10);

//         if (isNaN(tanamNo)) {
//           console.error("Invalid tanam_no:", tanam_no);
//           return res
//             .status(400)
//             .json({ success: false, message: "Invalid tanam_no" });
//         }

//         const updatedTanam = await updateTanam(tanamNo, req.body);

//         console.log(updateTanam);

//         if (!updatedTanam) {
//           console.log(`Tanam not found with tanam_no: ${tanamNo}`);
//           return res
//             .status(404)
//             .json({ success: false, message: "Tanam not found" });
//         }

//         res.status(200).json({ success: true, data: updatedTanam });
//       } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//       }

//       break;
//   }
// }
