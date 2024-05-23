import mongoose from "mongoose";

const TanamSchema = new mongoose.Schema(
  {
    Tanam_no: {
      type: Number,
      // required: true,
      unique: true,
    },
    Tanaman_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tanaman",
      required: true,
    },
    Tgl_semai: {
      type: Date,
      required: true,
    },
    Tgl_pindah: {
      type: Date,
      required: true,
    },
    Tgl_panen: {
      type: Date,
      required: true,
    },
    Keterangan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TanamSchema.pre("save", async function (next) {
  const tanam = this;
  if (tanam.isNew) {
    const lastTanam = await tanam.constructor.findOne().sort({ Tanam_no: -1 });
    tanam.Tanam_no = lastTanam ? lastTanam.Tanam_no + 1 : 1;
  }
  next();
});

export default mongoose.models.Tanam || mongoose.model("Tanam", TanamSchema);
