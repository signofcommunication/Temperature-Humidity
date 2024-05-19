import mongoose from "mongoose";

const KelembapanTanamSchema = new mongoose.Schema(
  {
    Tanam_no: {
      type: Number,
      required: true,
      ref: "Tanam",
    },
    Catat_kelembapan: {
      type: Date,
      required: true,
      unique: true,
    },
    Kelembapan: {
      type: mongoose.Decimal128,
      required: true,
    },
    Keterangan: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Kelembapan_Tanam ||
  mongoose.model("Kelembapan_Tanam", KelembapanTanamSchema);
