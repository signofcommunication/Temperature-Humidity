import mongoose from "mongoose";

const TanamSchema = new mongoose.Schema(
  {
    Tanam_no: {
      type: Number,
      required: true,
      unique: true,
    },
    Tanaman_ID: {
      type: String,
      required: true,
      ref: "Tanaman",
    },
    Tgl_semai: {
      type: Date,
      required: true,
    },
    Tgl_pindah: {
      type: Date,
    },
    Tgl_panen: {
      type: Date,
    },
    Keterangan: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tanam || mongoose.model("Tanam", TanamSchema);
