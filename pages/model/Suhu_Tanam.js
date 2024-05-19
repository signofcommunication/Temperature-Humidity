import mongoose from "mongoose";

const SuhuTanamSchema = new mongoose.Schema(
  {
    Tanam_no: {
      type: Number,
      required: true,
      ref: "Tanam",
    },
    Catat_suhu: {
      type: Date,
      required: true,
      unique: true,
    },
    Suhu: {
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

export default mongoose.models.Suhu_Tanam ||
  mongoose.model("Suhu_Tanam", SuhuTanamSchema);
